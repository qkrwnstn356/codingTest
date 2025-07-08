// 문제 데이터 구조
const problems = [
    {
        id: 1,
        title: "1번 문제",
        description: "제시된 문자열의 첫 글자를 대문자로 하고 나머지는 소문자로 변환해주세요.",
        constraints: "제시된 변수의 문자열은 모두 String 타입입니다.",
        example: "'Dkbmc'",
        initialCode: `function changeToCase() {
    let answer = 'dKbMc';
    
    // 이 곳에 구현해주세요.
    
    return answer;
}

// 테스트 실행
console.log(changeToCase());`,
        solution: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        testCases: [
            { input: 'dKbMc', expected: 'Dkbmc' },
            { input: 'HELLO', expected: 'Hello' },
            { input: 'world', expected: 'World' }
        ]
    },
    {
        id: 2,
        title: "2번 문제",
        description: "제시된 url의 데이터를 fetch를 사용하여 userId가 4인 값들의 id와 title만 리스트 형태로 반환해주세요.",
        constraints: `async/await 비동기 처리 방식을 사용해주세요.
가져올 데이터의 userId의 타입은 Number입니다. 요청할 API 주소는 'https://jsonplaceholder.typicode.com/posts' 입니다. 해당 url만 사용해주세요.`,
        example: `[
  { id: 31, title: 'ullam ut quidem id aut vel consequuntur' }, 
  { id: 32, title: 'doloremque illum aliquid sunt' },
  ...
]`,
        initialCode: `const url = 'https://jsonplaceholder.typicode.com/posts';

async function fetchUserIdData(url) {
    // 이 곳에 구현해주세요.
    
}

// 테스트 실행
fetchUserIdData(url).then(result => console.log(result));`,
        solution: async function(url) {
            const response = await fetch(url);
            const data = await response.json();
            return data.filter(post => post.userId === 4).map(post => ({ id: post.id, title: post.title }));
        }
    },
    {
        id: 3,
        title: "3번 문제",
        description: "제시된 dataList는 배열 안의 배열 구조입니다. 각 배열을 새로운 배열 안에 하나의 key value 형태의 오브젝트로 변환해주세요. 배열의 각 field는 key 값이 되고 value는 각 배열의 key에 대한 value가 됩니다.",
        constraints: `제시된 배열의 각 field와 value 이 외에 다른 상태 필드는 없습니다.
반환 시 각 value에 대한 타입은 유지해주세요.`,
        example: `[
    { 
        "vtOrderNo": "test2", 
        "vtDeliveryDate": "07-07-2025", 
        "supplierSoldTo": 3400251, 
        "supplierShipTo": 4400144, 
        "supplierPoNo": "PoNumber-111", 
        "buyerSoldTo": 3400143, 
        "branch": "Canada", 
        "buyerShipTo": 4400315, 
        "buyerPoNo": "Order-Po_nuber1", 
        "material": "10140NXC", 
        "qty": -200 
    },
    { 
        ...
    }
]`,
        initialCode: `const dataList = [
    [
      { "field": "vtOrderNo", "value": "test2" },
      { "field": "vtDeliveryDate", "value": "07-07-2025" },
      { "field": "supplierSoldTo", "value": 3400251 },
      { "field": "supplierShipTo", "value": 4400144 },
      { "field": "supplierPoNo", "value": "PoNumber-111" },
      { "field": "buyerSoldTo", "value": 3400143 },
      { "field": "branch", "value": "Canada" },
      { "field": "buyerShipTo", "value": 4400315 },
      { "field": "buyerPoNo", "value": "Order-Po_nuber1" },
      { "field": "material", "value": "10140NXC" },
      { "field": "qty", "value": -200 }
    ],
    [
      { "field": "vtOrderNo", "value": "test2" },
      { "field": "vtDeliveryDate", "value": "07-07-2025" },
      { "field": "supplierSoldTo", "value": 3400251 },
      { "field": "supplierShipTo", "value": 4400144 },
      { "field": "supplierPoNo", "value": "PoNumber-111" },
      { "field": "buyerSoldTo", "value": 3400143 },
      { "field": "branch", "value": "Canada" },
      { "field": "buyerShipTo", "value": 4425146 },
      { "field": "buyerPoNo", "value": "Order-Po_nuber5" },
      { "field": "material", "value": "17733NXK" },
      { "field": "qty", "value": 1 }
    ]
];

function formatingNewList(dataList) {
    // 이 곳에 구현해주세요.
    
}

// 테스트 실행
console.log(formatingNewList(dataList));`,
        solution: function(dataList) {
            return dataList.map(arr => {
                return arr.reduce((obj, item) => {
                    obj[item.field] = item.value;
                    return obj;
                }, {});
            });
        }
    }
];

// 현재 문제 상태
let currentProblem = 0;

// 사용자 작업 내용 저장소
let userProgress = {};

// DOM 요소들
const problemTitle = document.getElementById('problemTitle');
const problemDesc = document.getElementById('problemDesc');
const problemConstraints = document.getElementById('problemConstraints');
const problemExample = document.getElementById('problemExample');
const codeInput = document.getElementById('codeInput');
const resultOutput = document.getElementById('resultOutput');
const problemCounter = document.getElementById('problemCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const runBtn = document.getElementById('runBtn');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// localStorage에서 사용자 진행상황 불러오기
function loadUserProgress() {
    const saved = localStorage.getItem('dkbmc_coding_test_progress');
    if (saved) {
        userProgress = JSON.parse(saved);
    } else {
        // 초기화
        userProgress = {};
        problems.forEach((problem, index) => {
            userProgress[index] = {
                code: problem.initialCode,
                result: "실행 결과가 여기에 표시됩니다.",
                resultColor: '#cccccc'
            };
        });
    }
}

// localStorage에 사용자 진행상황 저장
function saveUserProgress() {
    localStorage.setItem('dkbmc_coding_test_progress', JSON.stringify(userProgress));
}

// 진행상황 초기화 (선택사항 - 필요시 사용)
function resetProgress() {
    if (confirm('모든 작업 내용이 초기화됩니다. 계속하시겠습니까?')) {
        localStorage.removeItem('dkbmc_coding_test_progress');
        loadUserProgress();
        renderProblem(currentProblem);
    }
}

// 현재 작업 내용 저장
function saveCurrentWork() {
    userProgress[currentProblem] = {
        code: codeInput.value,
        result: resultOutput.textContent,
        resultColor: resultOutput.style.color || '#cccccc'
    };
    saveUserProgress();
}

// 문제 렌더링
function renderProblem(index) {
    const problem = problems[index];
    
    problemTitle.textContent = problem.title;
    problemDesc.textContent = problem.description;
    problemConstraints.textContent = problem.constraints;
    problemExample.textContent = problem.example;
    
    // 저장된 코드가 있으면 불러오기, 없으면 초기 코드 사용
    if (userProgress[index]) {
        codeInput.value = userProgress[index].code;
        resultOutput.textContent = userProgress[index].result;
        resultOutput.style.color = userProgress[index].resultColor;
    } else {
        codeInput.value = problem.initialCode;
        resultOutput.textContent = "실행 결과가 여기에 표시됩니다.";
        resultOutput.style.color = '#cccccc';
    }
    
    // 문제 카운터 업데이트
    problemCounter.textContent = `${index + 1} / ${problems.length}`;
    
    // 네비게이션 버튼 상태 업데이트
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === problems.length - 1;
}

// 코드 실행
function runCode() {
    const code = codeInput.value;
    
    try {
        // 콘솔 로그 캡처
        const originalConsoleLog = console.log;
        const logs = [];
        
        console.log = function(...args) {
            logs.push(args.map(arg => {
                if (typeof arg === 'object') {
                    return JSON.stringify(arg, null, 2);
                }
                return String(arg);
            }).join(' '));
        };
        
        // 코드 실행
        eval(code);
        
        // 콘솔 복원
        console.log = originalConsoleLog;
        
        // 결과 표시
        if (logs.length > 0) {
            resultOutput.textContent = logs.join('\n');
            resultOutput.style.color = '#cccccc';
        } else {
            resultOutput.textContent = "실행 완료 (출력 없음)";
            resultOutput.style.color = '#cccccc';
        }
        
    } catch (error) {
        resultOutput.textContent = `에러: ${error.message}`;
        resultOutput.style.color = '#ff6b6b';
    }
    
    // 실행 결과 저장
    saveCurrentWork();
}

// 제출
function submitCode() {
    const code = codeInput.value;
    
    try {
        // 현재 문제에 따라 테스트
        const problem = problems[currentProblem];
        
        if (problem.id === 1) {
            // 1번 문제 테스트
            eval(code);
            if (typeof changeToCase === 'function') {
                const result = changeToCase();
                if (result === 'Dkbmc') {
                    resultOutput.textContent = "✅ 제출 성공!\n결과: " + result;
                    resultOutput.style.color = '#28a745';
                } else {
                    resultOutput.textContent = "❌ 테스트 실패\n예상: 'Dkbmc'\n실제: " + result;
                    resultOutput.style.color = '#ff6b6b';
                }
            } else {
                resultOutput.textContent = "❌ changeToCase 함수가 정의되지 않았습니다.";
                resultOutput.style.color = '#ff6b6b';
            }
        } else if (problem.id === 2) {
            // 2번 문제 테스트
            eval(code);
            if (typeof fetchUserIdData === 'function') {
                fetchUserIdData('https://jsonplaceholder.typicode.com/posts')
                    .then(result => {
                        if (Array.isArray(result) && result.length > 0 && result[0].id && result[0].title) {
                            const isValid = result.every(item => item.id && item.title && Object.keys(item).length === 2);
                            if (isValid) {
                                resultOutput.textContent = "✅ 제출 성공!\n결과: " + JSON.stringify(result.slice(0, 2), null, 2) + "\n...";
                                resultOutput.style.color = '#28a745';
                            } else {
                                resultOutput.textContent = "❌ 반환 형식이 올바르지 않습니다.";
                                resultOutput.style.color = '#ff6b6b';
                            }
                        } else {
                            resultOutput.textContent = "❌ 반환 값이 올바르지 않습니다.";
                            resultOutput.style.color = '#ff6b6b';
                        }
                    })
                    .catch(error => {
                        resultOutput.textContent = "❌ 에러: " + error.message;
                        resultOutput.style.color = '#ff6b6b';
                    });
            } else {
                resultOutput.textContent = "❌ fetchUserIdData 함수가 정의되지 않았습니다.";
                resultOutput.style.color = '#ff6b6b';
            }
        } else if (problem.id === 3) {
            // 3번 문제 테스트
            eval(code);
            if (typeof formatingNewList === 'function') {
                const result = formatingNewList(dataList);
                if (Array.isArray(result) && result.length === 2) {
                    const isValid = result.every(obj => 
                        obj.vtOrderNo && obj.vtDeliveryDate && obj.supplierSoldTo && obj.material
                    );
                    if (isValid) {
                        resultOutput.textContent = "✅ 제출 성공!\n결과: " + JSON.stringify(result[0], null, 2);
                        resultOutput.style.color = '#28a745';
                    } else {
                        resultOutput.textContent = "❌ 반환 형식이 올바르지 않습니다.";
                        resultOutput.style.color = '#ff6b6b';
                    }
                } else {
                    resultOutput.textContent = "❌ 반환 값이 올바르지 않습니다.";
                    resultOutput.style.color = '#ff6b6b';
                }
            } else {
                resultOutput.textContent = "❌ formatingNewList 함수가 정의되지 않았습니다.";
                resultOutput.style.color = '#ff6b6b';
            }
        }
        
             } catch (error) {
         resultOutput.textContent = `❌ 에러: ${error.message}`;
         resultOutput.style.color = '#ff6b6b';
     }
     
     // 제출 결과 저장
     saveCurrentWork();
 }

// 이벤트 리스너
prevBtn.addEventListener('click', () => {
    // 현재 작업 내용 저장
    saveCurrentWork();
    
    if (currentProblem > 0) {
        currentProblem--;
        renderProblem(currentProblem);
    }
});

nextBtn.addEventListener('click', () => {
    // 현재 작업 내용 저장
    saveCurrentWork();
    
    if (currentProblem < problems.length - 1) {
        currentProblem++;
        renderProblem(currentProblem);
    }
});

runBtn.addEventListener('click', runCode);
submitBtn.addEventListener('click', submitCode);
resetBtn.addEventListener('click', resetProgress);

// 코드 입력 시 자동 저장 (실시간 저장)
codeInput.addEventListener('input', () => {
    // 디바운싱으로 성능 최적화
    clearTimeout(codeInput.saveTimeout);
    codeInput.saveTimeout = setTimeout(saveCurrentWork, 1000);
});

// 페이지 떠날 때 저장
window.addEventListener('beforeunload', () => {
    saveCurrentWork();
});

// 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
    loadUserProgress();
    renderProblem(currentProblem);
});

// 코드 에디터 개선 (탭 키 지원)
codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;
        
        codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);
        codeInput.selectionStart = codeInput.selectionEnd = start + 4;
    }
});


 