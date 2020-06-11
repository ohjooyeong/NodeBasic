// 미리 이벤트리스너를 만들어두고,
// (이벤트 리스너는 특정 이벤트가 발생했을 때 어떤 동작을 할지 정의하는 부분)

// 예시) 사람들이 서버에 방문(이벤트)하면 HTML 파일을 줄거야.

const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("방문", () => {
    console.log("방문해주셔서 감사합니다.");
});
// on 과 addEventListener는 같은 기능을 하는 별명
myEvent.on("종료", () => {
    console.log("안녕히가세요");
});
myEvent.on("종료", () => {
    console.log("제발 좀 가세요");
});

myEvent.once("특별이벤트", () => {
    console.log("한 번만 실행됩니다.");
});
myEvent.emit("방문");
myEvent.emit("종료");
myEvent.emit("특별이벤트");
myEvent.emit("특별이벤트");
myEvent.on("계속", () => {
    console.log("계속 리스닝");
});
myEvent.removeAllListeners("계속");
myEvent.emit("계속");

const callback = () => {
    console.log("안녕히 가세요");
};
myEvent.on("종료1", () => {
    console.log("안녕히 가세요");
});
myEvent.on("종료1", callback);
myEvent.removeListener("종료1", callback);
myEvent.emit("종료1");

myEvent.listenerCount("종료1");
console.log(myEvent.listenerCount("종료"));
