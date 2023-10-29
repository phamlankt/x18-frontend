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

  const AtomSideBar = atom({
    key: "AtomSideBar",
    default: false,
    effects_UNSTABLE: [persistAtom],
  });

  const AtomDataJobs = atom({
    key: "AtomDataJobs",
    default: [],
    effects_UNSTABLE: [persistAtom],
  });

const Recoil = {
    AtomDataJobs,
    AtomCheckDataUser,
    AtomDataUser,
    AtomSideBar
}



export default Recoil;