// $('선택자').each(function(index){
//     // 이 안에서 this 는 선택된 요소를 말한다.
//     console.log($(this).text());     // 요렇게 하면 현재 요소의 text 값을 콘솔에 출력해줄 것이다.
//     console.log("index : " + index); // 각 요소의 인덱스 값을 출력해 준다. (0 부터 시작)
// });

// $('.reference_record_area tr:first td').each(function(index){
//     console.log( $(this).text()+''+index);
//     var relativeInfo = $(this).text();
//     $('.reference_record_area tr:eq(1) td:eq('+ index + ')').text(  
//         calculateDate($('input#selectionDate').val(),relativeInfo));
// })


// $('.reference_record_area tr:eq(1) td:eq('+ '2' + ')');

// var asOfDate = new Date(적절)

// 숫자 얻고
// 문자 얻고

// switch(문자){

//     d?

//     m?

//     y?

//     q?
//     로 시간 계산
// }

// 계산된 시간을 적절한 칸에 직접 넣음.

// 또한 이는 함수로 작성
// 이 함수는 메인 .js 에 포함시켜둘 예정.


// var test = function calculateDate(selectionDate, relativeInfo){
//     var asOfDate = new Date(selectionDate);
//     var numInfo = parseInt(relativeInfo.substring(0,relativeInfo.length-1));
//     var timeUnit = relativeInfo.charAt(relativeInfo.length-1);
//     var calculatedDate ; 
//     switch(timeUnit){
//         case 'd':
//             asOfDate.setDate(date.getDate() + 1 * numInfo); 
//             break;
//         case 'w':
//             asOfDate.setDate(date.getDate() + 7 * numInfo);
//             break;
//         case 'm':
//             asOfDate.setMonth(date.getMonth() + numInfo);
//             break;
//         case 'y':
//             asOfDate.setFullYear(date.getFullYear() + numInfo);
//             break;
//     }

//     calculatedDate = asOfDate;
//     return calculatedDate;
// }



// var date = new Date(2019, 1, 1);
// console.log('기준일자 : ' + date + '<br>');

// date.setFullYear(date.getFullYear() + 1);
// console.log('1년 후 : ' + date + '<br>');

// date = new Date(2019, 1, 1);
// date.setFullYear(date.getFullYear() - 1);
// console.log('1년 전 : ' + date + '<br>');



// var date = new Date(2019, 1, 1);
// console.log('기준일자 : ' + date + '<br>');

// date.setMonth(date.getMonth() - 13);
// console.log('13개월 전 : ' + date + '<br>');

// date = new Date(2019, 1, 1);
// date.setFullYear(date.getFullYear() - 1);
// console.log('1년 전 : ' + date + '<br>');





// --------------
// var date = new Date(2019, 12, 10);
// console.log('기준일자 : ' + date + '<br>');

// date.setDate(date.getDate() + 7 * numInfo);
// console.log('13일 전 : ' + date + '<br>');



// var date = new Date(2019, 12, 10);
// console.log('기준일자 : ' + date + '<br>');

// date.setDate(date.getDate() + 7 * -1);
// console.log('13일 전 : ' + date + '<br>');