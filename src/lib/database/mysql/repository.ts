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
      sampleContents.forEach((item: Partial<Contents>, index: number) => {
        const contents = new Contents();
        const title = item.title ?? "제목";
        const subTitle = item.subTitle ?? "부제목";
        const imageLink = item.imageLink ?? "/assets/images/free_image1.png";
        const desc =
          item.description ??
          "설명설명설명설명설명설명설명설명설명설명설명설명";

        contents.imageLink = imageLink;
        contents.title = title + index;
        contents.subTitle = subTitle + index;
        contents.description = desc + index;

        this.contents.save(contents);
      });
    };

    const generateUserTable = () => {
      sampleUsers.forEach((item: Partial<User>, index: number) => {
        const user = new User();
        const email = item.email ?? "awakelife93@gmail.com";
        const nickname = item.name ?? "Harry";

        user.email = email + index;
        user.password = item.password ?? "123";
        user.name = nickname + index;

        if (index === 0) {
          user.role = UserRole.ADMIN;
        }

        this.user.save(user);
      });
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
