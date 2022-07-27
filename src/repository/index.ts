import config from "@/config";
import { Contents } from "@/entities/Contents";
import { User } from "@/entities/User";
import { ErrorStatusMessage } from "@/lib";
import _ from "lodash";
import { getManager, Repository } from "typeorm";

class AppRepository {
  private user: Repository<User> | null = null;
  private contents: Repository<Contents> | null = null;

  connect(): void {
    const manager = getManager(config.NODE_ENV);

    this.user = manager.getRepository(User);
    this.contents = manager.getRepository(Contents);
  }

  get User(): Repository<User> {
    if (_.isNull(this.user)) {
      throw new Error(`User ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.user;
  }

  get Contents(): Repository<Contents> {
    if (_.isNull(this.contents)) {
      throw new Error(`Contents ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.contents;
  }
}

export default new AppRepository();
