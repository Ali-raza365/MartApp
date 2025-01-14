import {MMKV} from "react-native-mmkv";


export const tokenStorage = new MMKV({
    id: "token",
    encryptionKey: "my-super-secret-key",
})


export const Storage = new MMKV({
    id: "storage",
    encryptionKey: "my-super-secret-key",
})

export const mmkvStorage = {
    setItem:(key:string,value:string)=>{
        Storage.set(key,value)
    },
    getItem:(key:string)=>{
        const value = Storage.getString(key)
        return value ? value : null
    },
    removeItem:(key:string)=>{
        Storage.delete(key)
    }
}