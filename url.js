const url = require("url");

// whatwg의 방식
// search 처리가 편리합니다.
const URL = url.URL;
const myURL = new URL("https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0");

console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));
console.log("------------------");

// 기존 노드의 방식
// 호스트가 없어도 사용가능한 방식
const parsedURL = url.parse("https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0");
console.log("url.parse():", parsedURL);
