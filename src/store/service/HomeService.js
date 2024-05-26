import { baseApi } from "../../utils/fetchBaseQuery";


const HomeService = baseApi.injectEndpoints({
      endpoints: (builder) => ({
        getData: builder.query({
            query: () => "/product_testing",
        }),
        partnerSection: builder.query({
            query: () => "/pages/home_top_section",
        }),
        SingleVideoData: builder.query({
            query: () => "/product_random",
        }),
        navigationData: builder.query({
            query: () => "/category",
        }),
    })
})

export const { useGetDataQuery , usePartnerSectionQuery , useSingleVideoDataQuery , useNavigationDataQuery } = HomeService
export default HomeService