const axios= require('axios');
const loadTransaction = () => dispatch => {
    axios.get('/manage/transaction/listTransaction')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                TranID: response.data[i].TranID,
                Name: response.data[i].Name,
                Target: response.data[i].Target,
                Money: response.data[i].Money,
                Description: response.data[i].Description,
                DateTrans: response.data[i].DateTrans,
                Type: response.data[i].Type,
                FeeTrans: response.data[i].FeeTrans
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
        dispatch({ // submit action => to reducer
            type: 'LOAD_LIST_TRANSACTION',
            item: tempList
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

export {loadTransaction};