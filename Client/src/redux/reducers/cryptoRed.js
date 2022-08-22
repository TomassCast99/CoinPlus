import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptos: [],
    cryptoFilter: [],
    details: [],
  },
  reducers: {
    setCryptoList: (state, { type, payload }) => {
      state.cryptos = payload;
      state.cryptoFilter = payload;
    },
    cryptoDetail: (state, { type, payload }) => {
      state.details = payload;
    },
    nameCrypto: (state, { type, payload }) => {
      state.cryptos = payload;
    },
    cryptoOrder: (state, { type, payload }) => {
      let tag =
        payload === "All"
          ? state.cryptoFilter
          : state.cryptoFilter.filter((cryptoFilter) => {
              return cryptoFilter.tag_groups?.includes(payload);
            });
      state.cryptos = tag;
    },
    filterForPrice: (state, { type, payload }) => {
      console.log(state.cryptos.price);
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.price - b.price);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.price - a.price);
      }

      console.log(state.cryptos);

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.price > 0;
      });
    },
    filterForVolume: (state, { type, payload }) => {
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.volume_24h - b.volume_24h);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.volume_24h - a.volume_24h);
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.volume_24h > 0;
      })
    },
    filterForPercentChange1h: (state, { type, payload }) => { 
       // ordeno de min a meyor, con los numeros negativos
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.percent_change_1h - b.percent_change_1h);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.percent_change_1h - a.percent_change_1h);
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.percent_change_1h;
      })

      console.log(state.cryptos);
    },
    // ordenar por categoria
    filterForPercentChange24h: (state, { type, payload }) => {
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.percent_change_24h;
      })
    },
    filterForPercentChange7d: (state, { type, payload }) => {
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.percent_change_7d - b.percent_change_7d);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.percent_change_7d - a.percent_change_7d);
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.percent_change_7d;
      })
    },
    filterForVolume24: (state, { type, payload }) => {
      if (payload === "min") {
        state.cryptos = state.cryptos.sort((a, b) => a.volume_change_24h - b.volume_change_24h);
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.volume_change_24h - a.volume_change_24h);
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.volume_change_24h;
      })
    },
    orderByName: (state, { type, payload }) => {
      if (payload === "asc") {
        state.cryptos = state.cryptos.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.cryptos = state.cryptos.sort((a, b) => b.name.localeCompare(a.name));
      }

      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.name;
      })
    }
  },
});

export const {setCryptoList, cryptoDetail, nameCrypto, cryptoOrder, filterForPrice,filterForVolume, filterForVolume24, filterForPercentChange1h, filterForPercentChange24h, filterForPercentChange7d, orderByName} =
  cryptoSlice.actions;

export default cryptoSlice.reducer;

export const fetchCrypto = () => (dispatch) => {
  axios
    .get("http://localhost:3001/crypto")
    .then((res) => {
      dispatch(setCryptoList(res.data));
    })
    .catch((err) => console.log(err));
};

export const detailCrypto = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/crypto/${id}`)
    .then((res) => {
      dispatch(cryptoDetail(res.data));
    })
    .catch((err) => console.log(err));
};

export const Cryptoname = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/crypto/?name=` + name)
    .then((res) => {
      dispatch(nameCrypto(res.data));
    })
    .catch((err) => console.log(err));
};

export const orderCrypto = (payload) => (dispatch) => {
  try {
    dispatch(cryptoOrder(payload));
  } catch (error) {
    console.log(error);
  }
};


// filter price
export const filterPrice = (payload) => (dispatch) => {
  dispatch(filterForPrice(payload));
}
// filter volume
export const filterVolume = (payload) => (dispatch) => {
  dispatch(filterForVolume(payload));
}
// filtro percent_change_1h
export const filterPercentChange1h = (payload) => (dispatch) => {
  dispatch(filterForPercentChange1h(payload));
}

// filtro percent_change_24h
export const filterPercentChange24h = (payload) => (dispatch) => {
  dispatch(filterForPercentChange24h(payload));
}

// filtro percent_change_7d
export const filterPercentChange7d = (payload) => (dispatch) => {
  dispatch(filterForPercentChange7d(payload));
}

// filtro last 7 days

export const filterVolume24 = (payload) => (dispatch) => {
  dispatch(filterForVolume24(payload));
}

// order for name
export const orderName = (payload) => (dispatch) => {
  dispatch(Cryptoname(payload));
}

// borrar el estado de detalles
export const cleanState = () => (dispatch) => {
  dispatch(cryptoDetail([]));
}

