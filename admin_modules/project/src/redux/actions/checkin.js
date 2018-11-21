const axios= require('axios');
const loadCheckin = () => dispatch => {
    axios.get('/manage/checkin/listCheckin')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                emailOrPhone: response.data[i].emailOrPhone,
                date: response.data[i].date,
                type: response.data[i].type
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
        console.log(tempList);
        dispatch({ // submit action => to reducer
            type: 'LOAD_LIST_CHECKIN',
            item: tempList
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

export {loadCheckin};