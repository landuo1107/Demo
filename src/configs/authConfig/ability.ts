import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

export type TUser = {
  type: 'user';
  // 用户信息字段 后面根据实际做补全
  id: number;
  role: number;
}

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = 'user' | TUser | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: TUser) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (role.id === 1) { // 根据用户角色相关字段去做判断  
    can('manage', 'all'); // 如果是管理员admin相关的 则能操作全部
  } else {
    can(['read', 'create'], 'user');
    can(['update', 'delete'], 'user', { role: 2 }); // 除管理员外 用户角色为2的可以进行更新删除操作 字段可定
  }

  return rules;
}

export function buildAbilityFor(role: TUser): AppAbility {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object) => object!.type
  });
}
