const axios= require('axios');
const loadUser = () => dispatch => {
    axios.get('/manage/userinfo/listuserinfo')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                name: response.data[i].name,
                email: response.data[i].email,
                phone: response.data[i].phone,
                verified: response.data[i].verified,
                money: response.data[i].money,
                status: response.data[i].status
            };
            tempList.push(object);
        }
        
        // console.log(empObj);
        // var {dispatch}=this.props;
        dispatch({ // submit action => to reducer
            type: 'LOAD_LIST_USERINFO',
            item: tempList
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

const changeStatusUser = (email,newStatus) => dispatch => {
    axios.post('/manage/userinfo/changestatus',{
        email: email,
        newStatus:newStatus
    })
    .then(function (response) {
      // handle success
      // console.log(empObj);
      // var {dispatch}=this.props;
    //   dispatch({ // submit action => to reducer
    //       type: 'LOAD_LIST_USERINFO',
    //       item: tempList
    //   });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export {loadUser,changeStatusUser};