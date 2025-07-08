// 문제 데이터 구조
const problems = [
    {
        id: 1,
        title: "1번 문제",
        description: "제시된 문자열의 첫 글자를 대문자로 하고 나머지는 소문자로 변환해주세요.",
        constraints: "제시된 변수의 문자열은 모두 String 타입입니다.",
        providedData: `const str = 'dKbMc';`,
        example: "'Dkbmc'",
        initialCode: `function changeToCase(str) {
    // 이 곳에 구현해주세요.
    
    return str;
}`,
        solution: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
    },
    {
        id: 2,
        title: "2번 문제",
        description: "제시된 url의 데이터를 fetch를 사용하여 userId가 4인 값들의 id와 title만 리스트 형태로 반환해주세요.",
        constraints: `async/await 비동기 처리 방식을 사용해주세요.
가져올 데이터의 userId의 타입은 Number입니다. 요청할 API 주소는 'https://jsonplaceholder.typicode.com/posts' 입니다. 해당 url만 사용해주세요.`,
        providedData: `const url = 'https://jsonplaceholder.typicode.com/posts';`,
        example: `[
  { id: 31, title: 'ullam ut quidem id aut vel consequuntur' }, 
  { id: 32, title: 'doloremque illum aliquid sunt' },
  ...
]`,
        initialCode: `async function fetchUserIdData(url) {
    // 이 곳에 구현해주세요.
    
    return [];
}`,
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
        providedData: `const dataList = [
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
];`,
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
        initialCode: `function formatingNewList(dataList) {
    // 이 곳에 구현해주세요.
    
    return [];
}`,
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

// 3번 문제용 샘플 데이터 (전역으로 정의하여 재사용)
const sampleDataList = [
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

// DOM 요소들
const problemTitle = document.getElementById('problemTitle');
const problemDesc = document.getElementById('problemDesc');
const problemConstraints = document.getElementById('problemConstraints');
const problemData = document.getElementById('problemData');
const problemExample = document.getElementById('problemExample');
const codeInput = document.getElementById('codeInput');
const resultOutput = document.getElementById('resultOutput');
const problemCounter = document.getElementById('problemCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const runBtn = document.getElementById('runBtn');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const userNameInput = document.getElementById('userName');

// 기본값으로 초기화
function initializeDefaultProgress() {
    userProgress = {};
    problems.forEach((problem, index) => {
        userProgress[index] = {
            code: problem.initialCode,
            result: "실행 결과가 여기에 표시됩니다.",
            resultColor: '#cccccc'
        };
    });
}

// localStorage에서 사용자 진행상황 불러오기
function loadUserProgress() {
    // 새로고침 감지 및 초기화 처리
    const isRefresh = sessionStorage.getItem('isRefresh') || 
                     (performance.navigation && performance.navigation.type === 1) ||
                     (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type === 'reload');
    
    if (isRefresh) {
        // 새로고침인 경우 localStorage 완전 삭제 후 디폴트 값으로 초기화
        localStorage.removeItem('dkbmc_coding_test_progress');
        localStorage.removeItem('dkbmc_user_name');
        sessionStorage.removeItem('isRefresh');
        
        // 디폴트 값으로 초기화
        initializeDefaultProgress();
        userNameInput.value = '';
        
        // 사용자에게 알림
        setTimeout(() => {
            alert('새로고침으로 인해 모든 작업 내용이 초기화되었습니다.');
        }, 100);
        
        return; // 조기 종료
    }
    
    // 일반적인 로딩 처리
    const saved = localStorage.getItem('dkbmc_coding_test_progress');
    const savedUserName = localStorage.getItem('dkbmc_user_name');
    
    if (saved) {
        userProgress = JSON.parse(saved);
    } else {
        initializeDefaultProgress();
    }
    
    // 사용자 이름 복원
    if (savedUserName) {
        userNameInput.value = savedUserName;
    }
}

// localStorage에 사용자 진행상황 저장
function saveUserProgress() {
    localStorage.setItem('dkbmc_coding_test_progress', JSON.stringify(userProgress));
    localStorage.setItem('dkbmc_user_name', userNameInput.value);
}

// 진행상황 초기화 (선택사항 - 필요시 사용)
function resetProgress() {
    if (confirm('모든 작업 내용이 초기화됩니다. 계속하시겠습니까?')) {
        // localStorage 완전 삭제
        localStorage.removeItem('dkbmc_coding_test_progress');
        localStorage.removeItem('dkbmc_user_name');
        
        // 디폴트 값으로 초기화
        initializeDefaultProgress();
        userNameInput.value = '';
        
        // 화면 업데이트 (첫 번째 문제로 이동)
        currentProblem = 0;
        renderProblem(currentProblem);
        
        // localStorage에 디폴트 값 저장
        saveUserProgress();
    }
}

// 수동으로 모든 데이터를 디폴트 값으로 강제 초기화
function forceResetToDefault() {
    // localStorage 완전 삭제
    localStorage.removeItem('dkbmc_coding_test_progress');
    localStorage.removeItem('dkbmc_user_name');
    
    // 디폴트 값으로 초기화
    initializeDefaultProgress();
    userNameInput.value = '';
    
    // 첫 번째 문제로 이동
    currentProblem = 0;
    renderProblem(currentProblem);
    
    console.log('모든 데이터가 디폴트 값으로 초기화되었습니다.');
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

// Syntax Highlighting 함수
function highlightCode(code) {
    if (!code) return '';
    
    // 이스케이프 HTML
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // JavaScript 키워드들
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do', 'return', 'try', 'catch', 'throw', 'new', 'class', 'async', 'await', 'import', 'export', 'default'];
    
    // 1. 문자열 하이라이팅 (따옴표 안의 내용)
    code = code.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>');
    
    // 2. 주석 하이라이팅
    code = code.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
    code = code.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
    
    // 3. 숫자 하이라이팅
    code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');
    
    // 4. 키워드 하이라이팅 (문자열이나 주석 안에 있지 않은 것만)
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b(?![^<]*>)(?![^<]*<\/span>)`, 'g');
        code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // 5. 함수명 하이라이팅 (function 다음이나 = 앞의 식별자)
    code = code.replace(/(?:function\s+)(\w+)|(\w+)(?=\s*=\s*(?:function|async))/g, (match, p1, p2) => {
        if (p1) return `function <span class="function">${p1}</span>`;
        if (p2) return `<span class="function">${p2}</span>`;
        return match;
    });
    
    // 6. 객체 프로퍼티 하이라이팅
    code = code.replace(/(\w+)(?=\s*:)/g, '<span class="property">$1</span>');
    
    // 7. 변수명 하이라이팅 (간단한 경우만)
    code = code.replace(/(?:let|const|var)\s+(\w+)/g, (match, varName) => {
        return match.replace(varName, `<span class="variable">${varName}</span>`);
    });
    
    // 8. 연산자와 괄호 하이라이팅
    code = code.replace(/[+\-*/%=<>!&|]+/g, '<span class="operator">$&</span>');
    code = code.replace(/[{}[\]()]/g, '<span class="bracket">$&</span>');
    
    return code;
}

// 문제 렌더링
function renderProblem(index) {
    const problem = problems[index];
    
    problemTitle.textContent = problem.title;
    problemDesc.textContent = problem.description;
    problemConstraints.textContent = problem.constraints;
    problemData.textContent = problem.providedData;
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
    const problem = problems[currentProblem];
    
    try {
        // 코드 실행
        eval(code);
        
        let result;
        let functionName;
        
        // 각 문제별 함수 실행
        if (problem.id === 1) {
            functionName = 'changeToCase';
            if (typeof changeToCase === 'function') {
                result = changeToCase('dKbMc');
            } else {
                throw new Error(`${functionName} 함수가 정의되지 않았습니다.`);
            }
        } else if (problem.id === 2) {
            functionName = 'fetchUserIdData';
            if (typeof fetchUserIdData === 'function') {
                const url = 'https://jsonplaceholder.typicode.com/posts';
                result = fetchUserIdData(url);
                
                // Promise인 경우 처리
                if (result instanceof Promise) {
                    result.then(data => {
                        resultOutput.textContent = JSON.stringify(data, null, 2);
                        resultOutput.style.color = '#cccccc';
                        saveCurrentWork();
                    }).catch(error => {
                        resultOutput.textContent = `비동기 에러: ${error.message}`;
                        resultOutput.style.color = '#ff6b6b';
                        saveCurrentWork();
                    });
                    
                    resultOutput.textContent = "비동기 함수 실행 중...";
                    resultOutput.style.color = '#ffeb3b';
                    saveCurrentWork();
                    return;
                }
            } else {
                throw new Error(`${functionName} 함수가 정의되지 않았습니다.`);
            }
        } else if (problem.id === 3) {
            functionName = 'formatingNewList';
            if (typeof formatingNewList === 'function') {
                // dataList가 없으면 전역 샘플 데이터 사용
                const testData = (typeof dataList !== 'undefined') ? dataList : sampleDataList;
                result = formatingNewList(testData);
            } else {
                throw new Error(`${functionName} 함수가 정의되지 않았습니다.`);
            }
        }
        
        // 결과 표시
        if (result !== undefined) {
            if (typeof result === 'object') {
                resultOutput.textContent = JSON.stringify(result, null, 2);
            } else {
                resultOutput.textContent = String(result);
            }
            resultOutput.style.color = '#cccccc';
        } else {
            resultOutput.textContent = "함수가 undefined를 반환했습니다.";
            resultOutput.style.color = '#ff9800';
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
    const problem = problems[currentProblem];
    
    // 3번 문제에서 지원자 이름 체크
    if (problem.id === 3) {
        const userName = userNameInput.value.trim();
        if (!userName) {
            alert('지원자 이름을 작성해 주세요.');
            userNameInput.focus();
            return;
        }
    }
    
    try {
        // 코드 실행
        eval(code);
        
        if (problem.id === 1) {
            // 1번 문제 테스트
            if (typeof changeToCase === 'function') {
                const userResult = changeToCase('dKbMc');
                const expectedResult = problem.solution('dKbMc');
                
                if (userResult === expectedResult) {
                    resultOutput.textContent = `✅ 제출 성공!\n결과: ${userResult}`;
                    resultOutput.style.color = '#28a745';
                } else {
                    resultOutput.textContent = `❌ 테스트 실패`;
                    resultOutput.style.color = '#ff6b6b';
                }
            } else {
                resultOutput.textContent = "❌ changeToCase 함수가 정의되지 않았습니다.";
                resultOutput.style.color = '#ff6b6b';
            }
        } else if (problem.id === 2) {
            // 2번 문제 테스트
            if (typeof fetchUserIdData === 'function') {
                const url = 'https://jsonplaceholder.typicode.com/posts';
                const userResult = fetchUserIdData(url);
                
                if (userResult instanceof Promise) {
                    resultOutput.textContent = "제출 검증 중...";
                    resultOutput.style.color = '#ffeb3b';
                    
                    Promise.all([userResult, problem.solution(url)]).then(([userData, solutionData]) => {
                        const isValid = Array.isArray(userData) && userData.length > 0 && 
                                       userData.every(item => item.id && item.title && Object.keys(item).length === 2);
                        
                        if (isValid && userData.length === solutionData.length) {
                            resultOutput.textContent = `✅ 제출 성공!\n결과:\n${JSON.stringify(userData, null, 2)}`;
                            resultOutput.style.color = '#28a745';
                        } else {
                            resultOutput.textContent = `❌ 테스트 실패`;
                            resultOutput.style.color = '#ff6b6b';
                        }
                        saveCurrentWork();
                    }).catch(error => {
                        resultOutput.textContent = "❌ 에러: " + error.message;
                        resultOutput.style.color = '#ff6b6b';
                        saveCurrentWork();
                    });
                    
                    saveCurrentWork();
                    return;
                } else {
                    resultOutput.textContent = "❌ fetchUserIdData 함수는 Promise를 반환해야 합니다.";
                    resultOutput.style.color = '#ff6b6b';
                }
            } else {
                resultOutput.textContent = "❌ fetchUserIdData 함수가 정의되지 않았습니다.";
                resultOutput.style.color = '#ff6b6b';
            }
        } else if (problem.id === 3) {
            // 3번 문제 테스트
            if (typeof formatingNewList === 'function') {
                try {
                    // 사용자 함수 실행 - dataList가 없으면 전역 샘플 데이터 사용
                    const testData = (typeof dataList !== 'undefined') ? dataList : sampleDataList;
                    const userResult = formatingNewList(testData);
                    const expectedResult = problem.solution(testData); // 같은 testData 사용
                    
                    // 결과 구조와 내용을 정확히 비교
                    const isValidStructure = Array.isArray(userResult) && userResult.length === expectedResult.length;
                    const isValidContent = isValidStructure && 
                        JSON.stringify(userResult) === JSON.stringify(expectedResult);
                    
                    if (isValidContent) {
                        resultOutput.textContent = `✅ 제출 성공!\n결과:\n${JSON.stringify(userResult, null, 2)}`;
                        resultOutput.style.color = '#28a745';
                    } else {
                        resultOutput.textContent = `❌ 테스트 실패\n기대값과 다른 결과입니다.`;
                        resultOutput.style.color = '#ff6b6b';
                    }
                } catch (error) {
                    resultOutput.textContent = `❌ 함수 실행 에러: ${error.message}`;
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

// 코드 입력 시 자동 저장
codeInput.addEventListener('input', () => {
    // 디바운싱으로 성능 최적화하여 자동 저장
    clearTimeout(codeInput.saveTimeout);
    codeInput.saveTimeout = setTimeout(saveCurrentWork, 1000);
});

// 사용자 이름 입력 시 자동 저장
userNameInput.addEventListener('input', () => {
    // 디바운싱으로 성능 최적화
    clearTimeout(userNameInput.saveTimeout);
    userNameInput.saveTimeout = setTimeout(() => {
        localStorage.setItem('dkbmc_user_name', userNameInput.value);
    }, 500);
});

// 페이지 로드 완료 표시
window.addEventListener('load', () => {
    sessionStorage.setItem('pageLoaded', 'true');
});

// 새로고침 감지를 위한 플래그 설정
window.addEventListener('beforeunload', (e) => {
    sessionStorage.setItem('isRefresh', 'true');
    
    // 현재 작업 저장 (새로고침 취소 시를 위해)
    saveCurrentWork();
    
    // 새로고침 확인 메시지 (브라우저 기본 메시지 사용)
    const confirmMessage = '작업 내용이 저장되지 않을 수 있습니다. 정말 페이지를 떠나시겠습니까?';
    
    // 브라우저 기본 확인 대화상자 표시
    e.preventDefault();
    e.returnValue = confirmMessage;
    
    return confirmMessage;
});

// 새로고침 취소 시 플래그 제거
window.addEventListener('focus', () => {
    // 사용자가 페이지로 돌아온 경우 (새로고침 취소)
    if (sessionStorage.getItem('isRefresh')) {
        sessionStorage.removeItem('isRefresh');
    }
});

// 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
    loadUserProgress();
    renderProblem(currentProblem);
    // 초기 하이라이팅 적용
    updateHighlighting();
});

// 전역 함수로 노출 (콘솔에서 사용 가능)
window.forceResetToDefault = forceResetToDefault;

// 코드 에디터 개선 (탭 키 지원 및 붙여넣기 감지)
codeInput.addEventListener('keydown', (e) => {
    // Tab 키 지원
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;
        
        codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);
        codeInput.selectionStart = codeInput.selectionEnd = start + 4;
        }
});



 