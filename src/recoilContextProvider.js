import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from "recoil";
  import { recoilPersist } from "recoil-persist";
  const { persistAtom } = recoilPersist();

  const AtomCheckDataUser = atom({
    key: "AtomCheckDataUser",
    default: false,
    effects_UNSTABLE: [persistAtom],
  });

  const AtomDataUser = atom({
    key: "AtomDataUser",
    default: {},
    effects_UNSTABLE: [persistAtom],
  });

  const Recoil = {
    AtomCheckDataUser,
    AtomDataUser
}

export default Recoil;