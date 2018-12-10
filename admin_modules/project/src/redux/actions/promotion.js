const axios= require('axios');
const loadPromotion = () => dispatch => {
    axios.get('/manage/promotion/listPromotion')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                ID_PRMOTION: response.data[i].ID_PRMOTION,
                Start_date: response.data[i].Start_date,
                End_date: response.data[i].End_date,
                Image: response.data[i].Image,
                Description: response.data[i].Description,
                Query: response.data[i].Query,
                Type_Transaction: response.data[i].Type_Transaction
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
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

const createPromotion = (promotion) => dispatch => {
    axios.post('/manage/promotion/create',{
        promotion: promotion
      })
      .then()
}

export {loadPromotion,createPromotion};