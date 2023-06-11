import ProductDetail from "../../models/productDetail";
import Joi from 'joi';

/*
    POST /api/product/detail
    {
        count: '',
        price: '',
        productId: '',
    }
*/
export const detail = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    count: Joi.string().required(), // required()가 있으면 필수 항목
    price: Joi.string().required(),
    productId: Joi.string().required(),
  });

  //검증과 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
    return;
  }

  const {count, price, productId} = ctx.request.body;
  const detail = new ProductDetail({
    count,
    price,
    productId,
  });
  try{
    await detail.save();
    ctx.body = detail;
  } catch(e) {
    ctx.throw(500, e);
  }
};

/*
    Get  /api/product/detail/:productId
*/
export const getProducts = async (ctx) => {
    const { productId } = ctx.params;
  
    try {
      const post = await ProductDetail.find({ productId : productId }).exec();
      if (!post) {
        ctx.status = 404;
        return;
      }
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  /*
      DELETE /api/product/detail/:id
  */
  export const remove = async (ctx) => {
    const {id} = ctx.params;
    try {
      await ProductDetail.findByIdAndRemove(id).exec();
      ctx.status = 204; // No Content (성공했으나 응답할 데이터 없음)
    } catch (e) {
      ctx.throw(500, e);
    }
  };