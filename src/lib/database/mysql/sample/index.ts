import { Contents } from "@/entities/Contents";
import { User } from "@/entities/User";
import AppRepository from "@/repository";
import { ContentParams } from "@/types/contents";
import { UserParams, UserRole } from "@/types/user";
import { sampleContents } from "./contents";
import { sampleUsers } from "./users";

const generateTestData = async (): Promise<void> => {
  const generateContentsTable = (): void => {
    sampleContents.forEach(async (item: ContentParams, index: number) => {
      const contents: Contents = await AppRepository.Contents.create({
        title: item.title + index,
        subTitle: item.subTitle + index,
        description: item.description + index,
        imageLink: item.imageLink,
      });

      AppRepository.Contents.save(contents);
    });
  };

  const generateUserTable = (): void => {
    sampleUsers.forEach(async (item: UserParams, index: number) => {
      const user: User = await AppRepository.User.create({
        email: item.email + index,
        name: item.name + index,
        password: item.password,
        role: index === 0 ? UserRole.ADMIN : UserRole.USER,
      });

      AppRepository.User.save(user);
    });
  };

  await generateContentsTable();
  await generateUserTable();
};

export default generateTestData;
