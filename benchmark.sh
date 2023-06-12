echo "BENCHMARKING USING APACHE  BENCHMARK";

ab -c 100 -t 5 -H "profile_id: 1"  "http://localhost:3001/api/v1/contracts/3"

ab -c 100 -t 5 -H "profile_id: 1"  "http://localhost:3001/api/v1/admin/best-profession\?start\=2020-01-01\&end\=2021-01-01\&limit\=10"

ab -c 100 -t 5 -H "profile_id: 1"  "http://localhost:3001/api/v1/jobs/2/pay"

ab -c 100 -t 5 -H "profile_id: 1"  "http://localhost:3001/api/v1/balances/deposit/2"

ab -c 100 -t 5 -H "profile_id: 1"  "http://localhost:3001/api/v1/admin/best-clients?end=2021-01-01&start=2020-01-01"