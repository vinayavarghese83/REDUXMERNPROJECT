import mongoose from 'mongoose';

const userSchema =mongoose.Schema({
    name: {
          type:String,
          required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password : {
       type: String,
       required: true,
   },
   image: {
      type:String,
      default:'abc.jpg',
   },
   isAdmin: {
      type:Boolean,
      default:false,
   }
},{
    timestamps : true
});

// userSchema.pre('save', async function (next) {
//      if(!this.isModified('password')){
//           next();
//      }
//      const salt = await bcrypt.genSalt(10);
//      this.password = bcrypt.hash(this.password,salt);
// });
// userSchema.methods.matchPassword= async function(pwd) {
//      return await bcrypt.compare(pwd,this.password);
// }

const User =mongoose.model('User',userSchema);
export default User;