import { useData } from './firebase'
import { useAuthState } from './firebase'

export const useProfile = (uid) => {
    const [isAdmin, l, e] = useData(`/admins/${uid}`)
    // console.log('is Admin from profile ' + isAdmin)
    
    return isAdmin
}
