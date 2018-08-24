import axios from 'axios';

export const apiUrl = 'http://localhost:8081';

export const api = {

    getProducts: () => axios.get(apiUrl + '/products').then(res => res.status === 200 ? res.data : []),

    getPromotions: id => axios.get(apiUrl + '/products/' + id).then(res => res.status === 200 ? res.data : [])

};
