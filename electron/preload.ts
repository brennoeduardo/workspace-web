import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  readconfig: async () => {
    return await ipcRenderer.invoke('readconfig')
  },
})
