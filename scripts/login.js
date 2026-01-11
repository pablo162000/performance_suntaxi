import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";

// Cargar usuarios desde CSV
const users = new SharedArray("users", () => {
  const lines = open("../data/users.csv").trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const user = {};
    headers.forEach((h, i) => user[h] = values[i]);
    return user;
  });
});

export const options = {
  scenarios: {
    login_test: {
      executor: "constant-arrival-rate",
      rate: 20,           // 20 TPS
      timeUnit: "1s",
      duration: "3m",
      preAllocatedVUs: 50,
      maxVUs: 200
    }
  },
  thresholds: {
    http_req_duration: ["p(95)<1500"],
    http_req_failed: ["rate<0.03"]
     }
};

export default function () {
  const user = users[scenario.iterationInTest % users.length];

  const response = http.post(
    "https://fakestoreapi.com/auth/login",
    JSON.stringify({
      username: user.user,
      password: user.passwd
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  check(response, {
    "status 201": r => r.status === 201,
    "token exists": r => r.json("token") !== undefined
  });

  sleep(0.1);
}
