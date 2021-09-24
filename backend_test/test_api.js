// 주의사항.
// 1. 자바스크립트 오브젝트 예시임을 감안한다.(실제 json문자열로 보낼경우, key는 모두 쌍따옴표가 포함된 문자열임.)

// about resultCode
// 0000 : successful.
// public final static String RESULT_CODE_SUCESS = "0000";					// 성공
// public final static String RESULT_CODE_FAIL_LOGIN = "0001";				// 로그인 실패
// public final static String RESULT_CODE_INVALID_PASSWORD = "0002";		// 비밀번호 오류
// public final static String RESULT_CODE_ID_EXIST = "0003";				// 아이디 존재
// public final static String RESULT_CODE_LOGIN_OVER = "0004";				// 중복로그인
// public final static String RESULT_CODE_ACCOUNT_LOCK = "0005";			// 아이디 잠김
// public final static String RESULT_CODE_TEST_FAIL = "0006";				// 테스트 실패



function apiExample(){

}
var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
  searchActivityIdList:[], // 활동 id 
  searchGoalIdList: [], // 목표 id list
  searchGoalTitleList: [], // 목표 제목 text 검색 list 
  searchKind: "",
  searchPathList: [],
};

var result = {
  resultCode: "",
  goalTitleList: [
    {
      goalId: "",
      parentId: "",
      title: "",
      kind: "",
      startDatetime: "",
      endDatetime: "",
      progressRate: "",
      modificationDatetime: "",
      createDatetime: "",
    },
  ],
};

function getActivityList(){

}

//ip:port/timeManage/getActivityList
// POST

// 유의사항 주기성 정보는 주어지지 않음.

var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
  searchActivityIdList:[4,5,6,7], // 활동 id 혹시몰라서.  
  searchGoalIdList: [], // 목표 id list
  searchGoalTitleList:  [], // 목표 제목 text 검색 list 
};

var result = {
  resultCode: "",
  activityList: [
    {
      "activityId" : "",
      "goalId" : "",
      "goalTitleInfo":{
        "goalId" : "",
        "parentId" : "",
        "title" : "",
        "kind" : "",
        "content" : "",
        "startDatetime" : "",
        "endDatetime" : "",
        "progressRate" : "",
        "color" : "",
        "createDatetime" : "",
        "modificationDatetime" : "",
      },
      "title" : "",
      "startDatetime" : "",
      "endDatetime" : "",
      "content" : "",
      "activityScore" : "",
      "shareStatus" : "",
      "createDatetime" : "",
      "modificationDatetime" : ""
    },
    {

    }
  ]
}


function insertActivity(){

}

//ip:port/timeManage/activity
// POST
var data ={
// activityId is empty
  "goalId" : "", // value로 빈 문자열 가능.
  "title" : "",
  "startDatetime" : "",
  "endDatetime" : "",
  "content" : "",
  "activityScore" : "",
  "shareStatus" : ""
};

var result = {
  resultCode: ""
};

function updateActivity(){

}

//ip:port/timeManage/activity
// PUT
var data ={
  "activityId" : "",
  "goalId" : "",
  "title" : "",
  "startDatetime" : "",
  "endDatetime" : "",
  "content" : "",
  "activityScore" : "",
  "shareStatus" : ""
};

var result = {
  resultCode: ""
};

function deleteActivity(){

}

//ip:port/timeManage/activity
// DELETE
var data ={
  "activityId" : ""
};

var result = {
  resultCode: ""
};






function goalTitleList(){

}

// 특징 : 목표 정보 리스트를 반환함.
// 목표 정보는 content와, 주기성 정보가 포함하지 않음.

//ip:port/goalManage/getGoalTitleList
// POST
var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
};

var result = {
  resultCode: "",
  goalTitleList: [
    {
      "goalId" : "",
      "parentId" : "",
      "title" : "",
      "kind" : "",
      // "content" : "",
      "startDatetime" : "",
      "endDatetime" : "",
      "progressRate" : "",
      "color" : "",
      "createDatetime" : "",
      "modificationDatetime" : "",
    },
    {

    }
  ],
};


function goalFullList(){

}
// 특징 : 목표 정보와 주기성 정보를 포함.

//ip:port/goalManage/getGoalFullList
// POST

var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
  searchGoalIdList: [], // 목표 id list
  searchKind: "",
};

var result = {
  resultCode: "",
  goalFullList: [
    {
      "goalId" : "",
      "parentId" : "",
      "title" : "",
      "kind" : "",
      "content" : "",
      "startDatetime" : "",
      "endDatetime" : "",
      "progressRate" : "",
      "color" : "",
      "createDatetime" : "",
      "modificationDatetime" : "",
      "periodicityInfo":{
// 기한 성 목표일 경우, value값이 오브젝트({})가 아니라 빈문자열 ""임.
        "periodicityId" : "",
        "goalId" : "",
        "timeUnit" : "",
        "type" : "",
        "count" : "",
        "sunYn" : "",
        "monYn" : "",
        "tueYn" : "",
        "wedsYn" : "",
        "thurYn" : "",
        "friYn" : "",
        "satYn" : "",
        "createDatetime" : "",
        "modificationDatetime" : "",
        // "deletionStatus" : ""
      }
    },
    {
      "goalId" : "",
      "parentId" : "",
      "title" : "",
      "kind" : "",
      "content" : "",
      "startDatetime" : "",
      "endDatetime" : "",
      "progressRate" : "",
      "color" : "",
      "createDatetime" : "",
      "modificationDatetime" : "",
      "periodicityInfo":{
// 기한 성 목표일 경우, value값이 오브젝트({})가 아니라 빈문자열 ""임.
      }
    },
  ],
};


function insertGoal(){

}

//ip:port/goalManage/goal
//POST

var data = {
  // "goalId" : "",
  "parentId" : "",
  "title" : "",
  "kind" : "",
  "content" : "",
  "startDatetime" : "",
  "endDatetime" : "",
  "progressRate" : "",
  "color" : "",
  // "createDatetime" : "",
  // "modificationDatetime" : "",
  "periodicityInfo":{
// 기한 성 목표일 경우, value값이 오브젝트({})가 아니라 빈문자열 ""임.
    "periodicityId" : "",
    "goalId" : "",
    "timeUnit" : "",
    "type" : "",
    "count" : "",
    "sunYn" : "",
    "monYn" : "",
    "tueYn" : "",
    "wedsYn" : "",
    "thurYn" : "",
    "friYn" : "",
    "satYn" : "",
    // "createDatetime" : "",
    // "modificationDatetime" : "",
    // "deletionStatus" : ""
  }
}

var result = {
  resultCode: "",
  //resultMessage..?

}




function updateGoal(){

}
//ip:port/goalManage/goal
// PUT

var data = {
  "goalId" : "",
  "parentId" : "",
  "title" : "",
  "kind" : "",
  "content" : "",
  "startDatetime" : "",
  "endDatetime" : "",
  "progressRate" : "",
  "color" : "",
  // "createDatetime" : "",
  // "modificationDatetime" : "",
  "periodicityInfo":{
// 기한 성 목표일 경우, value값이 오브젝트({})가 아니라 빈문자열 ""임.
    "periodicityId" : "",
    "goalId" : "",
    "timeUnit" : "",
    "type" : "",
    "count" : "",
    "sunYn" : "",
    "monYn" : "",
    "tueYn" : "",
    "wedsYn" : "",
    "thurYn" : "",
    "friYn" : "",
    "satYn" : "",
    // "createDatetime" : "",
    // "modificationDatetime" : "",
    // "deletionStatus" : ""
  }
}
 
 var result = {
   resultCode: "",
   //resultMessage..?
 
 }


function deleteGoal(){

}
//ip:port/goalManage/goal
// DELETE
var data = {
   goalId: "" // 필수.
 }
 
 var result = {
   resultCode: "",
   //resultMessage..?
 
 }


 