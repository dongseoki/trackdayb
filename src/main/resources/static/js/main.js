function leftPad(value) { if (value >= 10) { return value; } return `0${value}`; }
function toStringByFormatting(source, delimiter = '-') { const year = source.getFullYear(); const month = leftPad(source.getMonth() + 1); const day = leftPad(source.getDate()); return [year, month, day].join(delimiter); }

function calculateDate(selectionDate, relativeInfo){
    var asOfDate = new Date(selectionDate);
    var numInfo = parseInt(relativeInfo.substring(0,relativeInfo.length-1));
    var timeUnit = relativeInfo.charAt(relativeInfo.length-1);
    var calculatedDate ; 
    // FIXME
    console.log('main.js is imported...?');
    switch(timeUnit){
        case 'd':
            asOfDate.setDate(asOfDate.getDate() + 1 * numInfo); 
            break;
        case 'w':
            asOfDate.setDate(asOfDate.getDate() + 7 * numInfo);
            break;
        case 'm':
            asOfDate.setMonth(asOfDate.getMonth() + numInfo);
            break;
        case 'y':
            asOfDate.setFullYear(asOfDate.getFullYear() + numInfo);
            break;
    }
    calculatedDate = asOfDate;
    return toStringByFormatting(calculatedDate);
}