import Inject from "../core/inject.decorator";
import Injectable from "../core/injectable-decorator";
import User from "../models/user";
import { UserService } from "../services/user-service";

@Injectable()
export class UserController {
    @Inject()
    public userService: UserService;

    getAllUser() {

        let userList = this.userService.yaz();
        console.log("Çalıştı.");
        console.log(userList);
    }

}