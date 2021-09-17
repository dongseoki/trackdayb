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
      goalId: "1",
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

function activityList(){

}

//ip:port/timeManage/activitylist
// POST
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
      "activityRecordId" : "", 
      "startDatetime" : "", 
      "endDatetime" : "", 
      "content" : "", 
      "activityScore" : "", 
      "modificationDatetime" : "", 
      "createDatetime" : "", 
      "shareStatus" : "", 
      "title" : "", 
      "goalTitleList":[
        {
          goalId: "1",
          parentId: "",
          title: "",
          kind: "", 
          startDatetime: "",
          endDatetime: "",
          progressRate: "",
          modificationDatetime: "",
          createDatetime: "",
        },
      ]
    },
  ],
}


function insertActivity(){

}

//ip:port/timeManage/insertActivity
// POST
var data ={
// activityRecordId is empty
  "startDatetime" : "", 
  "endDatetime" : "", 
  "content" : "", 
  "activityScore" : "", 
  "modificationDatetime" : "", 
  "createDatetime" : "", 
  "shareStatus" : "", 
  "title" : "", 
  "goalIdList":[
 
  ]
};

var result = {
  resultCode: ""
};

function updateActivity(){

}

//ip:port/timeManage/updateActivity
// POST
var data ={
  activityRecordId : "",
  "startDatetime" : "", 
  "endDatetime" : "", 
  "content" : "", 
  "activityScore" : "", 
  "modificationDatetime" : "", 
  "createDatetime" : "", 
  "shareStatus" : "", 
  "title" : "", 
  "goalIdList":[

  ]
};

var result = {
  resultCode: ""
};

function deleteActivity(){

}

//ip:port/timeManage/deleteActivity
// POST
var data ={
  activityRecordId : ""
};

var result = {
  resultCode: ""
};






function goalTitleList(){

}
//ip:port/goalManage/goalTitleList
// POST
var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
  //searchGoalIdList: [], // 목표 id list
  searchGoalTitleList: [], // 목표 제목 text     검색 list 
  //searchKind: "", 
  searchPathList: [],
};

var result = {
  resultCode: "",
  goalTitleList: [
    {
      goalId: "1",
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


function goalFullList(){

}
//ip:port/goalManage/goalFullList
// POST

var data = {
  searchStartDatetime: "",
  searchEndDatetime: "",
  searchGoalIdList: [], // 목표 id list
  searchKind: "",
  searchPathList: [],
};

var result = {
  resultCode: "",
  goalFullList: [
    {
      goalId: "",
      parentId: "",
      title: "",
      kind: "",
      content: "",
      startDatetime: "",
      endDatetime: "",
      progressRate: "",
      modificationDatetime: "",
      createDatetime: "",
    },
    {
      goalId: "",
      parentId: "",
      title: "",
      kind: "",
      content: "",
      startDatetime: "",
      endDatetime: "",
      progressRate: "",
      modificationDatetime: "",
      createDatetime: "",
      regularInfo:{
        "wef":""
      }
    },
  ],
};


function insertGoal(){

}

//ip:port/goalManage/insertGoal
// POST

var data = {
 // goalId: "",
  parentId: "",
  title: "",
  kind: "",
  content: "",
  startDatetime: "",
  endDatetime: "",
  progressRate: "",
  modificationDatetime: "",
  createDatetime: "",
}

var result = {
  resultCode: "",
  //resultMessage..?

}




function updateGoal(){

}
//ip:port/goalManage/updateGoal
// POST

var data = {
   goalId: "", // 필수.
   parentId: "",
   title: "",
   kind: "",
   content: "",
   startDatetime: "",
   endDatetime: "",
   progressRate: "",
   modificationDatetime: "",
   createDatetime: "",
 }
 
 var result = {
   resultCode: "",
   //resultMessage..?
 
 }


function deleteGoal(){

}
//ip:port/goalManage/deleteGoal
// POST
var data = {
   goalId: "" // 필수.
 }
 
 var result = {
   resultCode: "",
   //resultMessage..?
 
 }


 