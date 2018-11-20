const axios= require('axios');
const loadCheckin = () => dispatch => {
    axios.get('/manage/transaction/listTransaction')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                phone: response.data[i].phone,
                gmail: response.data[i].gmail,
                date: response.data[i].date,
                type: response.data[i].type
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
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