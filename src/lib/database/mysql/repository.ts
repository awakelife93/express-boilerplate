import config from "@/config";
import { Contents } from "@/models/Contents/entity";
import { User } from "@/models/User/entity";
import { UserRole } from "@/models/User/type";
import { getManager, Repository } from "typeorm";
import { sampleContents } from "./sample/contents";
import { sampleUsers } from "./sample/users";

class AppRepository {
  private user!: Repository<User>;
  private contents!: Repository<Contents>;

  async generateTestData(): Promise<void> {
    const generateContentsTable = () => {
      sampleContents.forEach(
        (
          item: Omit<
            Contents,
            "contentId" | "isDeleted" | "createdDt" | "updatedDt"
          >,
          index: number
        ) => {
          const contents = new Contents();

          contents.title = item.title + index;
          contents.subTitle = item.subTitle + index;
          contents.imageLink = item.imageLink;
          contents.description = item.description + index;

          this.contents.save(contents);
        }
      );
    };

    const generateUserTable = () => {
      sampleUsers.forEach(
        (
          item: Omit<
            User,
            | "userId"
            | "role"
            | "isDeleted"
            | "createdDt"
            | "updatedDt"
            | "findPassword"
          >,
          index: number
        ) => {
          const user = new User();

          user.email = item.email + index;
          user.password = item.password ?? "123";
          user.name = item.name + index;

          if (index === 0) {
            user.role = UserRole.ADMIN;
          }

          this.user.save(user);
        }
      );
    };

    await generateContentsTable();
    await generateUserTable();
  }

  connect(): void {
    this.user = getManager(config.NODE_ENV).getRepository(User);
    this.contents = getManager(config.NODE_ENV).getRepository(Contents);
  }

  get User(): Repository<User> {
    return this.user;
  }

  get Contents(): Repository<Contents> {
    return this.contents;
  }
}

export default new AppRepository();
