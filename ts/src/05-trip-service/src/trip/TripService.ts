import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser = this.getLoggedUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.getTrips(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected getTrips(user: User) {
        return TripDAO.findTripsByUser(user);
    }

    protected getLoggedUser() {
        const loggedUser: User | null = UserSession.getLoggedUser();
        return loggedUser;
    }
}
