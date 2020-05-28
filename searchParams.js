const url = require("url");

const URL = url.URL;
const myURL = new URL(
    "https://search.naver.com/search.naver?sm=top_sug.pre&fbm=1&acr=1&acq=d&qdt=0&ie=utf8&query=d+day%EA%B3%84%EC%82%B0%EA%B8%B0"
);
console.log("searchParams.getAll():", myURL.searchParams.getAll("sm"));
console.log("searchParams.get():", myURL.searchParams.get("query"));
console.log("searchParams.has():", myURL.searchParams.has("qdt"));

console.log("searchParams.keys():", myURL.searchParams.keys());
console.log("searchParams.values():", myURL.searchParams.values());

// append는 값 추가(기존 값 보존)
myURL.searchParams.append("filter", "es3"); // &filter=es3
myURL.searchParams.append("filter", "es5"); // &filter=es3&filter=es5
console.log(myURL.searchParams.getAll("filter"));

// set은 기존 값 초기화 후 수정
myURL.searchParams.set("filter", "es6");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter"));

console.log("searchParams.toString():", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
