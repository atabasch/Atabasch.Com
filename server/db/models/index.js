import {connection} from "~/server/db/connection"
import UserModel from "~/server/db/models/User";
import UserDataModel from "~/server/db/models/UserData";
import TaxonomyModel from "~/server/db/models/Taxonomy";
import PostTypeModel from "~/server/db/models/PostType";
import PostModel from "~/server/db/models/Post";
import PostExtraModel from "~/server/db/models/PostExtra";
import TermModel from "~/server/db/models/Term";
import PostTermModel from "~/server/db/models/PostTerm";
import ConfigModel from "~/server/db/models/Config";
import ContactModel from "~/server/db/models/Contact";
import CustomFieldModel from "~/server/db/models/CustomField";
import NavigationModel from "~/server/db/models/Navigation";

UserModel.hasOne(UserDataModel, { as:'data', sourceKey:'userId', foreignKey: 'userId', onDelete: 'CASCADE' })
UserDataModel.belongsTo(UserModel, { as:'user', foreignKey: 'userId', targetKey:'userId', onDelete: 'CASCADE' })

UserModel.hasMany(PostModel, { as: 'posts', sourceKey:'userId', foreignKey: 'postAuthor', onDelete: 'SET NULL' })
TaxonomyModel.hasMany(TermModel, { as: 'terms', sourceKey: 'taxId', foreignKey: 'taxId', onDelete: 'CASCADE' })

PostTypeModel.hasMany(PostModel, { as:'posts', sourceKey:'postTypeId', foreignKey:'postTypeId', onDelete: 'NO ACTION' })
PostModel.belongsTo(PostTypeModel, { as:'type', foreignKey:'postTypeId', sourceKey:'postTypeId', onDelete: 'NO ACTION' })

PostModel.hasMany(PostExtraModel, { as:'extra', sourceKey:'postId', foreignKey:'postId', onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
PostExtraModel.belongsTo(PostModel, { as:'post', foreignKey:'postId', targetKey:'postId', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })

PostModel.belongsTo(UserModel, { as:'user', foreignKey:'postAuthor', targetKey:'userId', onDelete: 'NO ACTION' })
TermModel.belongsTo(TaxonomyModel, { as: "taxonomy" ,foreignKey:"taxId", targetKey:"taxId", onDelete: 'NO ACTION' });

PostModel.belongsToMany(TermModel, { as: 'terms', uniqueKey:false, foreignKey: 'PostId', through: PostTermModel})
TermModel.belongsToMany(PostModel, { as: 'posts', uniqueKey:false, foreignKey: 'TermId', through: PostTermModel})

PostTypeModel.hasMany(CustomFieldModel, { as:'fields', sourceKey:'postTypeId', foreignKey:'postTypeId', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
CustomFieldModel.belongsTo(PostTypeModel, { as:'postType', sourceKey:'postTypeId', foreignKey:'postTypeId', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })

// NavigationModel.hasMany(NavigationModel, { as:'items', sourceKey:'navigationId', foreignKey: 'navigationParent', onDelete: 'NO ACTION', onUpdate: 'NO ACTION'  })


export const User = UserModel
export const UserData = UserDataModel
export const Taxonomy = TaxonomyModel
export const PostType = PostTypeModel
export const Post = PostModel
export const PostExtra = PostExtraModel
export const Term = TermModel
export const PostTerm = PostTermModel
export const Config = ConfigModel
export const Contact = ContactModel
export const CustomField = CustomFieldModel
export const Navigation = NavigationModel



export const Sync =  async function(){
    await UserModel.sync({ force: true })
    await UserDataModel.sync({ force: true })
    await TaxonomyModel.sync({ force: true })
    await PostType.sync({ force: true })
    await PostModel.sync({ force: true })
    await PostExtraModel.sync({ force: true })
    await TermModel.sync({ force: true })
    await PostTermModel.sync({ force: true })
    await ConfigModel.sync({ force: true })
    await ContactModel.sync({ force: true })
    await CustomFieldModel.sync({ force: true })
    await NavigationModel.sync({ force: true })
}


export const Destroy =  async function(){
    await connection.drop()
    await User.drop()
    await UserData.drop()
    await Taxonomy.drop()
    await PostType.drop()
    await Post.drop()
    await PostExtra.drop()
    await Term.drop()
    await PostTerm.drop()
    await Config.drop()
    await Contact.drop()
    await CustomField.drop()
    await Navigation.drop()
}

