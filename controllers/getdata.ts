import axios, { AxiosResponse, AxiosError } from 'axios';


export const  getdata =  async (req: any,res: any) => {

    try{
        let responseData: any = {};
        let OffersData: any;
        const headers = {
            'X-Forwarded-For': req.headers['x-forwarded-for'],
            'content-type': req.headers['content-type']
        }
        OffersData = await axios.post('https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',{
            Platform: 'web',
            IsTiering: true
        }, {headers})

        responseData.OffersDate = OffersData.data
        
        return res.status(200).json(responseData);
    }catch(error) {
        return res.json(error)
    }
    
    
}