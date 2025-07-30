import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"
import Loader from "../Loader"


export default function ProfileView() {

    const { data , isLoading } = useAuth()

    if(isLoading) return <Loader />
    if(data) return <ProfileForm data={data} />

}
