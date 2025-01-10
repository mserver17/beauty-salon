import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../store";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit("auth/setUser", {
      id: user.uid,
      name: user.displayName || "No name",
      email: user.email,
    });
    store.commit("auth/setAuthenticated", true);
  } else {
    store.commit("auth/setUser", null);
    store.commit("auth/setAuthenticated", false);
  }
});

export default auth;
