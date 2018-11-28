const axios= require('axios');
const loadPromotion = () => dispatch => {
    axios.get('/manage/checkin/listPromotion')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                ID_PRMOTION: response.data[i].ID_PRMOTION,
                Start_date: response.data[i].Start_date,
                Image: response.data[i].Image,
                Description: response.data[i].Description,
                Query: response.data[i].Query,
                Type_Transaction: response.data[i].Type_Transaction,
                Status: response.data[i].Status
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
        console.log(tempList);
        dispatch({ // submit action => to reducer
            type: 'LOAD_LIST_PROMOTION',
            item: tempList
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

export {loadPromotion};