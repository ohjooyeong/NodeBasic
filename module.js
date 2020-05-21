const os = require("os");
// console.log(os.arch());
// console.log(os.platform());
// console.log(os.type());
// console.log(os.uptime());
// console.log(os.hostname());
// console.log(os.homedir());
// console.log(os.cpus());
// 노드는 싱글스레드 기반이라 하나의 코어 밖에 안쓰지만 남은 코어들을 파악하여 반복문을 돌려서 남은 개수의 코어들을 돌려서 하는 작업은 '멀티 프로세싱' 이라함

const path = require("path");
console.log(path.sep); // \ 역슬래시
console.log(path.delimiter); // ; 세미콜론 환경변수의 구분자

console.log(path.dirname(__filename)); // C:\github\NodeBasic
console.log(path.extname(__filename)); // .js
console.log(path.basename(__filename)); // module.js

console.log(path.parse(__filename)); // 위에 3개 전체 구조를 분해
console.log(path.format({ root: "C:\\", dir: "C:\\github\\NodeBasic", base: "module.js", ext: ".js", name: "module" })); // C:\github\NodeBasic\module.js 구조를 합쳐준다

console.log(path.normalize("C:\\github//NodeBasic\\module.js")); // 경로의 \\// 슬래시를 잘못쳐도 normalize 메서드가 알아서 올바르게 만들어 준다.

console.log(path.isAbsolute("C:\\")); // true 반환 이 경로가 절대경로냐 상대경로냐 알려준다.
// ./ 현재 폴더 상대경로
// ../ 부모 폴더 상대경로
// / 루트 절대 경로

console.log(path.relative("C:\\github\\NodeBasic\\module.js", "C:\\")); // 첫번째 인자가 두번째 인자로 갈때의 상대경로를 알려준다.

console.log(__dirname);
console.log(path.join(__dirname, "..", "/github", ".", "NodeBasic")); // 조각난 폴더의 경로를 합쳐준다 절대 경로 무시하고 합침
console.log(path.resolve(__dirname, "..", "/github", ".", "NodeBasic")); // 조각난 폴더의 경로를 합쳐준다 절대 경로 고려하고 합침
// 쉽게 말하자면 path.resolve는 오른쪽에서 왼쪽으로 읽으며 path.join 과는 다르게 상대경로와 절대경로를 인식하여 구분합니다!
