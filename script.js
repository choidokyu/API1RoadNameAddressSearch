
document.getElementById('addrForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const keyword = document.getElementById('keyword').value;
  if (!keyword || /[%=><]/.test(keyword)) {
    alert("검색어를 입력하세요. 특수문자는 사용할 수 없습니다.");
    return;
  }

  const params = new URLSearchParams({
    currentPage: '1',
    countPerPage: '10',
    resultType: 'json',
    confmKey: 'YOUR_KEY_HERE', // <-- 발급받은 키로 교체하세요
    keyword: keyword
  });

  const apiUrl = `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?${params.toString()}&callback=parseResult`;

  const script = document.createElement('script');
  script.src = apiUrl;
  document.body.appendChild(script);
});

function parseResult(data) {
  const resultDiv = document.getElementById('resultList');
  resultDiv.innerHTML = '';

  if (data.results.common.errorCode !== '0') {
    resultDiv.innerHTML = `<p>에러: ${data.results.common.errorMessage}</p>`;
    return;
  }

  data.results.juso.forEach(juso => {
    const p = document.createElement('p');
    p.textContent = `${juso.roadAddr} (${juso.zipNo})`;
    resultDiv.appendChild(p);
  });
}
