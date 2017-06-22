const state = () => {
  return {
    //datail: [],
  };
};


export default {

  namespace: 'indexList',

  state: state(),

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  reducers: {
    init() {
      return state();
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    detailData(state, { payload }) {
      sessionStorage.setItem("detaiList", JSON.stringify(payload));
      return { ...state, detail: { ...payload }};
    },
    TabData(state, { payload }) {
      return { ...state, detail: { ...payload }};
    }
},

};
