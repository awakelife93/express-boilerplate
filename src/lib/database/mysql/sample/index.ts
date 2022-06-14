import { Contents } from "@/models/Contents";
import { User } from "@/models/User";
import AppRepository from "@/repository";
import { ContentParamsType } from "@/types/contents";
import { UserParamsType, UserRole } from "@/types/user";
import { sampleContents } from "./contents";
import { sampleUsers } from "./users";

const generateTestData = async (): Promise<void> => {
  const generateContentsTable = (): void => {
    sampleContents.forEach((item: ContentParamsType, index: number) => {
      const contents = new Contents();

      contents.title = item.title + index;
      contents.subTitle = item.subTitle + index;
      contents.description = item.description + index;
      contents.imageLink = item.imageLink;

      AppRepository.Contents.save(contents);
    });
  };

  const generateUserTable = (): void => {
    sampleUsers.forEach((item: UserParamsType, index: number) => {
      const user = new User();

      user.email = item.email + index;
      user.name = item.name + index;
      user.password = item.password;

      if (index === 0) {
        user.role = UserRole.ADMIN;
      }

      AppRepository.User.save(user);
    });
  };

  await generateContentsTable();
  await generateUserTable();
};

export default generateTestData;
