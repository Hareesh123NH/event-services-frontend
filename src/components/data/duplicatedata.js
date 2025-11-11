import {
    Home,
    ShoppingCart,
    BookOpen,
    History,
    User,
    LayoutDashboard,
    ClipboardList,
    Wrench,
    PlusCircle,
    Users,
    Layers,
} from "lucide-react";

export const filtersList = [
    {
        title: "All",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200"
    },
    {
        title: "Photography",
        image: "https://academy-cdn.wedio.com/2021/08/christian-wiediger-gVbOF8mdE3U-unsplash.jpg",
        detailImg: "https://aaft.com/blog/wp-content/uploads/2025/05/AdobeStock_150026021.jpeg"
    },
    {
        title: "Videography",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqnYhXoV1s19Y4_eAEb29Ks_gJRiCljeoDrw&s",
        detailImg: "https://www.iconmedia.co.in/wp-content/uploads/2024/09/videography-slider.jpg"

    },
    {
        title: "Stage Decoration",
        image: "https://coohom-biz-sg-s3.coohom.com/ins/static/article/freshers-stage-overview-1758604737062147600.jpg?x-oss-process=image/format,webp",
        detailImg: "https://5.imimg.com/data5/SELLER/Default/2022/12/WZ/UK/PQ/163516196/stage-decoration-for-school-annual-day.jpeg"

    },
    {
        title: "Catering",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SQe2xrgfSQh2_VMnOhZSZ59uN53vjkcXbQ&s",
        detailImg: "https://www.richentertainmentgroup.com/wp-content/uploads/09-2024-catering.jpg"
    },
    {
        title: "Makeup & Styling",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVXf2jcp4cRORwXYX8O2pdhJO8x2U7iIDDg&s",
        detailImg: "https://filmfare.wwmindia.com/content/2020/nov/lakme21605275021.jpg"
    },
    {
        title: "Lighting",
        image: "https://cdn-akipm.nitrocdn.com/KGegQqircKVmJsaAVnvRwxAneyEMEXGQ/assets/mobile/optimized/rev-35b2b84/lh7-rt.googleusercontent.com/docsz/8706221ea03ef4bc2774f1adfb6feda0.AD_4nXe8h6azSeFrTJ8k-Sj3ThvpJgG4U-vY01vsetpp6evMRA73_Vw-txjT_D219v3WNGUmiX_oPIElrbHZ_SwA3DOl0I0huqv3O9m6Rlabl9hcNttZJT929vM-DhinWK7tRJ7ZucOnRw",
        detailImg: "https://www.mr-resistor.co.uk/img/photo/springgarden2000.jpg"

    },
    {
        title: "Sound System",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBj5A7cVmwc7Q4qNkDuGXO-En7ldR3z_HOQ&s",
        detailImg: "https://www.shutterstock.com/image-photo/playing-song-on-bluetooth-speaker-260nw-1526103098.jpg"
    },
    {
        title: "Venue Decoration",
        image: "https://cdn0.weddingwire.in/vendor/4250/3_2/960/jpg/1k0a6407_15_224250-1560250858.jpeg",
        detailImg: "https://i.pinimg.com/736x/ec/a2/90/eca2908b8bd291aa827b2f008b36ab1d.jpg"
    },
    {
        title: "Flower Arrangement",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTigf3jE-SAXBKPTXiR7EJSPrwGY9uogqVggQ&s",
        detailImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRysMrf5DZWvVwICyH_WZBEfGV-T6AXgrF0XQ&s"
    },
    {
        title: "Event Management",
        image: "https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg?semt=ais_hybrid&w=740&q=80",
        detailImg: "https://add24.in/assets/img/1WAYAVBestPracticesEventManagment.jpeg"
    },
    {
        title: "Mehendi",
        image: "https://content.jdmagicbox.com/v2/comp/hyderabad/b3/040pxx40.xx40.231108122243.g8b3/catalogue/rk-mehandi-artist-hyderabad-mehendi-artists-svsdm9dpbi.jpg",
        detailImg: "https://teetumehandiart.com/wp-content/uploads/2025/10/teetu-mehandi-art-greater-noida-bridal-wedding-henna.webp"
    },
    {
        title: "DJ & Music",
        image: "https://play-lh.googleusercontent.com/bnfB1bUJKtmgqXZsFWwUJi4o7iMaw7lyUaQF8XfHtJ6JTDLvtI5qtYUeQ75swxw_ovA=w240-h480-rw",
        detailImg: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/10496/images/a67164-f1f1-82e5-e8c-afffdbd7a060_AdobeStock_110110063.jpeg"
    },
    {
        title: "Live Band",
        image: "https://cdn.mos.cms.futurecdn.net/84a1666bb2f03d5b0ac27212f0993fed.jpg",
        detailImg: "https://media.gettyimages.com/id/1579958721/video/close-up-asian-chinese-drummer-jamming-session-with-multiracial-group-live-band-performance.jpg?s=640x640&k=20&c=rr1UuJIHp6uUVWg-6U1W7-r6atman-wdd0siVWoGa34="
    },
    {
        title: "Invitation Design",
        image: "https://play-lh.googleusercontent.com/HqBleqg_2TUm6jnL_jnT_twqBWQnvrUndpfgnkGr7GvG5rsfWfjQfX4HrQT6CwXFYwfY=w526-h296-rw",
        detailImg: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1695649100/catalog/1679387390252171264/kga9bcyascyex2kr5ufv.jpg"
    },
    {
        title: "Transportation",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wHlHTRQgtrR0XM5mygOzkYkqznTlYxwXcw&s",
        detailImg: "https://www.teletrans.com/wp-content/uploads/2021/03/group-and-event-transportation.png"
    },
    {
        title: "Tent House",
        image: "https://4.imimg.com/data4/SF/GR/MY-11050156/pavilion-tent-500x500.jpg",
        detailImg: "https://www.shaadidukaan.com/user_images/innerSlider_images/default/m/4-m.jpg"
    },
    {
        title: "Costume Rental",
        image: "https://content.jdmagicbox.com/v2/comp/hyderabad/m7/040pxx40.xx40.140427122619.m3m7/catalogue/sree-sampradaya-cultural-creation-tara-nagar-chanda-nagar-hyderabad-kuchipudi-dance-costume-manufacturers-y93r9n8rmd.jpg",
        detailImg: "https://content.jdmagicbox.com/comp/kottayam/z4/9999px481.x481.230428161100.t2z4/catalogue/candid-suit-gallery-pala-town-kottayam-kurta-pyjama-on-rent-z8seiaxn3b.jpg"
    },
    {
        title: "Security Services",
        image: "https://federalsecurity.in/wp-content/uploads/2024/08/Security-guards.jpg",
        detailImg: "https://silentprofessionals.org/wp-content/uploads/2018/05/Security-Service.jpg"

    },
    {
        title: "Cleaning & Maintenance",
        image: "https://cmmonline.com/wp-content/uploads/CMMOnline-3.jpg",
        detailImg: "https://cleanhousemelbourne.com.au/wp-content/uploads/2024/01/Event-Cleaning-Service-2.png"
    },
    {
        title: "Guest Management",
        image: "https://thumbs.dreamstime.com/b/flat-style-illustration-depicting-happy-holidays-celebration-celebrate-every-arrival-unique-welcome-illustration-art-set-412455303.jpg",
        detailImg: "https://www.msrchm.edu/wp-content/themes/msrchm-new/img/banner1.jpg"
    },
    {
        title: "Entertainment",
        image: "https://brassanimals.com/wp-content/uploads/2025/02/Luxury-Event-Entertainment-25-Unique-Ideas-for-an-Upscale-Experience.webp",
        detailImg: "https://socio.events/wp-content/uploads/2022/06/AdobeStock_339206331-1312x875.jpeg"
    },
    {
        title: "Anchoring",
        image: "https://images.hindi.news18.com/ibnkhabar/uploads/2021/10/Career-In-Stage-Anchoring-Jobs-16353339134x3.jpg",
        detailImg: "https://5.imimg.com/data5/NW/DN/GLADMIN-33431652/anchoring-courses-500x500.jpg"
    },
    {
        title: "Traditional Performers",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnVBVJoypOtypxZVt_vNGdICUXY-DpEb-B885pVIn0W3nZUWW5foJOBKe7VcYuAjYPKSc&usqp=CAU",
        detailImg: "https://images.indianexpress.com/2018/11/dance-fest-759.jpg?w=414"
    },
    {
        title: "Drone Shoot",
        image: "https://flyandtech.com/wp-content/uploads/2025/02/smart-photographer-drone.jpg",
        detailImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTta6QpCPL1yVdvV1u02CvyXohCjEh6L3VC9A&s"
    },
];


export const bgImages = [
    "https://images.unsplash.com/photo-1521334884684-d80222895322",
    "https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66Sg0W73efIQ5MjJfjYF5-vces_wQyUp0iw&s",
];

export const categories = [
    {
        title: "Photography",
        video: "https://youtu.be/6IButVnBcfs?si=1pqM0Rq3Qh4Jpxy4",
        image: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-learning-feature.jpg",
    },
    {
        title: "Catering",
        video: "https://www.youtube.com/watch?v=2noiRae9h54&pp=ygUIY2F0ZXJpbmc%3D",
        image: "https://www.shutterstock.com/image-photo/catering-staff-serves-food-buffet-600nw-2630302985.jpg",
    },
    {
        title: "Stage Decoration",
        video: "https://www.youtube.com/watch?v=377K-aV_1ZU&pp=ygUac3RhZ2UgZGVjb3JhdGlvbiBpbiBldmVudHM%3D",
        image: "https://www.udvahadecors.com/wp-content/uploads/2017/09/Event-Stage-001-min.jpg",
    },
    {
        title: "Makeup & Styling",
        video: "https://www.youtube.com/watch?v=tKM1_B4Ez7k&pp=ygUsbWFrZXVwICYgc3R5bGluZyB0b29scyBmb3IgcHJvbW90aW9uYWwgdmlkZW8%3D",
        image: "https://cdn.prod.website-files.com/653ae1c54dbd39d682d7871a/68ed5c7d0a9310c1297410db_Bride%20getting%20makeup%20applied%20by%20bridal%20makeup%20artist%20for%20wedding%20trial%20copy.webp",
    },
    {
        title: "Lighting & Sound",
        video: "https://www.youtube.com/watch?v=gAjRmAZWgZ8&pp=ygUbTGlnaHRpbmcgJiBTb3VuZCBmb3IgZXZlbnRz",
        image: "https://lirp.cdn-website.com/3b4682ef/dms3rep/multi/opt/111605519_m-1920w.jpg",
    },
    {
        title: "Entertainment",
        video: "https://youtu.be/u_wB6byrl5k?si=YpSLMu5VSgGN8ti",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ0r9qKNNqxbiTVigFUvoUDXCQWWV3sxuzOg&s",
    }
];

export const testimonials = [
    { text: "We found all vendors for our wedding in one place!", author: "Sneha & Arjun" },
    { text: "Our catering and photography teams were top-notch!", author: "Rahul Events Pvt. Ltd." },
];


export const vendorServiceDetails = {
    success: true,
    message: "Vendor service details fetched successfully",
    data: {
        _id: "68edef4d46a4f31f05973ab3",
        vendor: {
            _id: "68d7a2ff5512a8fa806df70c",
            full_name: "Vendor1",
            email: "gbhuvana938@gmail.com",
            phone_number: "9876543210",
            description: "I am providing catering",
            address: "123 Main Street, Hyderabad",
        },
        service: {
            _id: "68d7a0adbdc024c7b9cdce13",
            service_name: "Decoration",
            description:
                "Beautiful event decoration including flowers, lighting, and stage setup",
            base_price: 2000,
            pricing_type: "per_day",
        },
        price: 2000,
        discount: 10,
        final_price: 1800,
        average_rating: 2.5,
        total_bookings: 0,
        status: "active",
        addons: [
            {
                title: "Extra Flowers",
                price: 500,
                description: "Add extra flowers to the decoration",
            },
        ],
        notes: "Customer prefers a red-themed stage",
    },
};

export const sidebarOptions = {
    vendor: [
        //   { label: "Dashboard", path: "overview", icon: LayoutDashboard },
        { label: "Pending Orders", path: "pending-orders", icon: ClipboardList },
        { label: "My Services", path: "services", icon: Wrench },
        { label: "Add Service", path: "add-service", icon: PlusCircle },
        { label: "Profile", path: "vendor-profile", icon: User },
    ],

    admin: [
        { label: "Vendor Registrations", path: "vendor-registrations", icon: Users },
        { label: "All Services", path: "all-services", icon: Layers },
        //       { label: "Profile", path: "profile", icon: User },
        { label: "Add Admin", path: "add-admin", icon: User },
    ],

    user: [
        { label: "Home", path: "home", icon: Home },
        { label: "Book Order", path: "book-order", icon: BookOpen },
        { label: "Order History", path: "history", icon: History },
        { label: "Profile", path: "profile", icon: User },
        { label: "Cart", path: "cart", icon: ShoppingCart },
    ],
};

export const orderData = {
    "success": true,
    "count": 5,
    "orders": [
        {
            "_id": "1",
            "event_date": "2025-12-13T00:00:00.000Z",
            "total_amount": 4800,
            "status": "pending",
            "payment_status": "pending",
            "order_date": "2025-10-14T11:25:36.091Z",
            "event_address": {
                "label": "work",
                "address_line1": "123 MG Road",
                "address_line2": "Near City Mall",
                "city": "Bengaluru"
            },
            "services": [
                {
                    "_id": "2",
                    "quantity": 1,
                    "price": 1800,
                    "scheduled_from": "2025-12-13T10:00:00.000Z",
                    "scheduled_to": "2025-12-13T12:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "gbhuvana938@gmail.com" },
                        "service_name": "Photography"
                    }
                },
                {
                    "_id": "3",
                    "quantity": 1,
                    "price": 3000,
                    "scheduled_from": "2025-12-13T13:00:00.000Z",
                    "scheduled_to": "2025-12-13T17:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "lightdecor@gmail.com" },
                        "service_name": "Stage Decoration"
                    }
                },
                {
                    "_id": "4",
                    "quantity": 1,
                    "price": 1800,
                    "scheduled_from": "2025-12-13T10:00:00.000Z",
                    "scheduled_to": "2025-12-13T12:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "gbhuvana938@gmail.com" },
                        "service_name": "Photography"
                    }
                },
                {
                    "_id": "5",
                    "quantity": 1,
                    "price": 3000,
                    "scheduled_from": "2025-12-13T13:00:00.000Z",
                    "scheduled_to": "2025-12-13T17:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "lightdecor@gmail.com" },
                        "service_name": "Stage Decoration"
                    }
                },
                {
                    "_id": "6",
                    "quantity": 1,
                    "price": 1800,
                    "scheduled_from": "2025-12-13T10:00:00.000Z",
                    "scheduled_to": "2025-12-13T12:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "gbhuvana938@gmail.com" },
                        "service_name": "Photography"
                    }
                },
                {
                    "_id": "7",
                    "quantity": 1,
                    "price": 3000,
                    "scheduled_from": "2025-12-13T13:00:00.000Z",
                    "scheduled_to": "2025-12-13T17:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "lightdecor@gmail.com" },
                        "service_name": "Stage Decoration"
                    }
                },
                {
                    "_id": "8",
                    "quantity": 1,
                    "price": 1800,
                    "scheduled_from": "2025-12-13T10:00:00.000Z",
                    "scheduled_to": "2025-12-13T12:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "gbhuvana938@gmail.com" },
                        "service_name": "Photography"
                    }
                },
                {
                    "_id": "9",
                    "quantity": 1,
                    "price": 3000,
                    "scheduled_from": "2025-12-13T13:00:00.000Z",
                    "scheduled_to": "2025-12-13T17:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "lightdecor@gmail.com" },
                        "service_name": "Stage Decoration"
                    }
                }
            ]
        },
        {
            "_id": "11",
            "event_date": "2025-11-01T00:00:00.000Z",
            "total_amount": 2700,
            "status": "confirmed",
            "payment_status": "paid",
            "order_date": "2025-10-14T11:14:19.557Z",
            "event_address": {
                "label": "home",
                "address_line1": "Plot 45, Lake View",
                "address_line2": "Whitefield",
                "city": "Bengaluru"
            },
            "services": [
                {
                    "_id": "22",
                    "quantity": 1,
                    "price": 1500,
                    "scheduled_from": "2025-11-01T09:00:00.000Z",
                    "scheduled_to": "2025-11-01T11:00:00.000Z",
                    "provider_status": "accepted",
                    "vendor_service": {
                        "vendor": { "email": "djbeats@gmail.com" },
                        "service_name": "DJ Sound Setup"
                    }
                },
                {
                    "_id": "33",
                    "quantity": 1,
                    "price": 1200,
                    "scheduled_from": "2025-11-01T11:30:00.000Z",
                    "scheduled_to": "2025-11-01T13:00:00.000Z",
                    "provider_status": "accepted",
                    "vendor_service": {
                        "vendor": { "email": "cateringhub@gmail.com" },
                        "service_name": "Catering"
                    }
                }
            ]
        },
        {
            "_id": "44",
            "event_date": "2025-10-25T00:00:00.000Z",
            "total_amount": 5000,
            "status": "cancelled",
            "payment_status": "refunded",
            "order_date": "2025-10-01T09:12:40.091Z",
            "event_address": {
                "label": "office",
                "address_line1": "Plot 77, Cyber Towers",
                "address_line2": "Hi-Tech City",
                "city": "Hyderabad"
            },
            "services": [
                {
                    "_id": "55",
                    "quantity": 1,
                    "price": 5000,
                    "scheduled_from": "2025-10-25T09:00:00.000Z",
                    "scheduled_to": "2025-10-25T12:00:00.000Z",
                    "provider_status": "cancelled",
                    "vendor_service": {
                        "vendor": { "email": "studioelite@gmail.com" },
                        "service_name": "Event Photography"
                    }
                }
            ]
        },
        {
            "_id": "66",
            "event_date": "2025-11-28T00:00:00.000Z",
            "total_amount": 3200,
            "status": "confirmed",
            "payment_status": "paid",
            "order_date": "2025-10-11T14:32:50.091Z",
            "event_address": {
                "label": "home",
                "address_line1": "Flat 101, Palm Residency",
                "address_line2": "Baner Road",
                "city": "Pune"
            },
            "services": [
                {
                    "_id": "77",
                    "quantity": 2,
                    "price": 1600,
                    "scheduled_from": "2025-11-28T09:00:00.000Z",
                    "scheduled_to": "2025-11-28T12:00:00.000Z",
                    "provider_status": "accepted",
                    "vendor_service": {
                        "vendor": { "email": "sushma.decor@gmail.com" },
                        "service_name": "Decoration"
                    }
                }
            ]
        },
        {
            "_id": "88",
            "event_date": "2025-12-20T00:00:00.000Z",
            "total_amount": 2700,
            "status": "pending",
            "payment_status": "pending",
            "order_date": "2025-10-17T10:45:00.000Z",
            "event_address": {
                "label": "home",
                "address_line1": "5th Avenue Street",
                "address_line2": "Near City Center",
                "city": "Chennai"
            },
            "services": [
                {
                    "_id": "99",
                    "quantity": 1,
                    "price": 900,
                    "scheduled_from": "2025-12-20T16:00:00.000Z",
                    "scheduled_to": "2025-12-20T19:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "soundwave.events@gmail.com" },
                        "service_name": "DJ Music"
                    }
                },
                {
                    "_id": "00",
                    "quantity": 2,
                    "price": 1800,
                    "scheduled_from": "2025-12-20T10:00:00.000Z",
                    "scheduled_to": "2025-12-20T14:00:00.000Z",
                    "provider_status": "pending",
                    "vendor_service": {
                        "vendor": { "email": "flowerworks@gmail.com" },
                        "service_name": "Flower Decoration"
                    }
                }
            ]
        }
    ]
}


export const pendingOrders = {
    "success": true,
    "count": 3,
    "orders": [
        {
            "order_id": "68ee333002a55c8e927aab5e",
            "user": {
                "_id": "68d79f3343f18d5faaf46fd6",
                "full_name": "Bhuvana",
                "email": "harifree286@gmail.com",
                "phone_number": "80994794734"
            },
            "event_address": {
                "_id": "68d7a24ebdc024c7b9cdce1a",
                "city": "Bengaluru",
                "state": "Karnataka"
            },
            "event_date": "2025-12-13T00:00:00.000Z",
            "status": "pending",
            "services": [
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68f3309eee0e2ba81dd92130",
                    "service_name": "Catering",
                    "quantity": 1,
                    "price": 1350,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68f3309eee0e2ba81dd92130",
                    "service_name": "Catering",
                    "quantity": 1,
                    "price": 1350,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                }
            ]
        },
        {
            "order_id": "68f33259ee0e2ba81dd9213e",
            "user": {
                "_id": "68d79f3343f18d5faaf46fd6",
                "full_name": "Bhuvana",
                "email": "harifree286@gmail.com",
                "phone_number": "80994794734"
            },
            "event_address": {
                "_id": "68d7a24ebdc024c7b9cdce1a",
                "city": "Bengaluru",
                "state": "Karnataka"
            },
            "event_date": "2025-12-13T00:00:00.000Z",
            "status": "pending",
            "services": [
                {
                    "service_id": "68f3309eee0e2ba81dd92130",
                    "service_name": "Catering",
                    "quantity": 1,
                    "price": 1350,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                }
            ]
        },
        {
            "order_id": "68f34e66402f6efed31e102b",
            "user": {
                "_id": "68d79f3343f18d5faaf46fd6",
                "full_name": "Bhuvana",
                "email": "harifree286@gmail.com",
                "phone_number": "80994794734"
            },
            "event_address": {
                "_id": "68d7a24ebdc024c7b9cdce1a",
                "city": "Bengaluru",
                "state": "Karnataka"
            },
            "event_date": "2025-12-13T00:00:00.000Z",
            "status": "pending",
            "services": [
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                },
                {
                    "service_id": "68edef4d46a4f31f05973ab3",
                    "service_name": "Decoration",
                    "quantity": 1,
                    "price": 1800,
                    "provider_status": "pending",
                    "scheduled_from": "2025-10-20T10:00:00.000Z",
                    "scheduled_to": "2025-10-20T12:00:00.000Z"
                }
            ]
        }
    ]
}



export const cartData = [
    { _id: "1", vendor: { full_name: "Vendor1", email: "vendor1@example.com", phone_number: "9876543210", }, service_name: "Decoration", final_price: 1800 },
    { _id: "2", vendor: { full_name: "Vendor1", email: "vendor1@example.com", phone_number: "9876543210", }, service_name: "Decoration", final_price: 1800 },
    { _id: "3", vendor: { full_name: "Vendor1", email: "vendor1@example.com", phone_number: "9876543210", }, service_name: "Decoration", final_price: 1800 },
    { _id: "4", vendor: { full_name: "Vendor1", email: "vendor1@example.com", phone_number: "9876543210", }, service_name: "Decoration", final_price: 1800 },
    { _id: "5", vendor: { full_name: "Vendor1", email: "vendor1@example.com", phone_number: "9876543210", }, service_name: "Decoration", final_price: 1800 },
]

export const addresses = [
    {
        _id: "68eddb778149a6a4f702e6f0",
        label: "Home",
        address_line1: "123 MG Road",
        address_line2: "Near City Mall",
        city: "hyderabad",
        state: "Telangana",
        postal_code: "560001",
        country: "India",
        alternate_phone: "+91-9876543210"
    },
    {
        _id: "68d7a24ebdc024c7b9cdce1a",
        label: "work",
        address_line1: "123 MG Road",
        address_line2: "Near City Mall",
        city: "Bengaluru",
        state: "Karnataka",
        postal_code: "560001",
        country: "India",
        alternate_phone: "+91-9876543210"
    }
];

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDBlNTdjYjhmOGFlMWQwYzAzMTgyMCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MDc4MzExOSwiZXhwIjoxNzYwNzg2NzE5fQ.gIef6APCWteFgcjCxHj2fYlIiIzoJAkf9uK22K7bo1I"


export const vendorRegistrations = [
    {
        _id: "11",
        vendor_name: "N Hareesh",
        email: "harifree286@gmail.com",
        phonenumber: "8008906106",
        desc: "I am providing catering",
        address: "123 Main Street, Hyderabad",
        service: {
            _id: "68d7a09ebdc024c7b9cdce10",
            service_name: "Catering",
            base_price: 1500,
            pricing_type: "per_day",
        },
        media: [
            { id: "68f36ae7402f6efed31e104a", mime_type: "application/pdf", name: "aadhar.pdf" },
            { id: "68f36ae7402f6efed31e104c", mime_type: "application/pdf", name: "pan_card.pdf" },
            { id: "68f36ae6402f6efed31e1048", mime_type: "application/pdf", name: "business_document.pdf" },
        ],
    },
    {
        _id: "22",
        vendor_name: "N Hareesh",
        email: "harifree286@gmail.com",
        phonenumber: "8008906106",
        desc: "I am providing catering",
        address: "123 Main Street, Hyderabad",
        service: {
            _id: "68d7a09ebdc024c7b9cdce10",
            service_name: "Catering",
            base_price: 1500,
            pricing_type: "per_day",
        },
        media: [
            { id: "4", mime_type: "application/pdf", name: "pan_card.pdf" },
            { id: "5", mime_type: "application/pdf", name: "adhar.pdf" },
            { id: "6", mime_type: "application/pdf", name: "business_document.pdf" },
        ],
    },
    {
        _id: "33",
        vendor_name: "N Hareesh",
        email: "harifree286@gmail.com",
        phonenumber: "8008906106",
        desc: "I am providing catering",
        address: "123 Main Street, Hyderabad",
        service: {
            _id: "68d7a09ebdc024c7b9cdce10",
            service_name: "Catering",
            base_price: 1500,
            pricing_type: "per_day",
        },
        media: [
            { id: "7", mime_type: "application/pdf", name: "aadhar_document.pdf" },
            { id: "8", mime_type: "application/pdf", name: "pancard.pdf" },
            { id: "9", mime_type: "application/pdf", name: "business_document.pdf" },
        ],
    },

];


export const vendorServices = {
    "services": [
        {
            "service": {
                "_id": "68d7a0adbdc024c7b9cdce13",
                "service_name": "Decoration",
                "description": "Beautiful event decoration including flowers, lighting, and stage setup",
                "base_price": 2000,
                "pricing_type": "per_day"
            },
            "price": 2000,
            "discount": 10,
            "final_price": 1800,
            "average_rating": 2.5,
            "total_bookings": 0,
            "status": "active",
            "addons": [
                {
                    "title": "Live Counters",
                    "price": 2000,
                    "description": "Extra food live counters for snacks"
                },
                {
                    "title": "Dessert Table",
                    "price": 1500,
                    "description": "Special desserts section"
                }
            ],
            "notes": "Only available for weddings and big events"
        },
        {
            "service": {
                "_id": "68d7a09ebdc024c7b9cdce10",
                "service_name": "Catering",
                "description": "Delicious food for weddings, parties, and events",
                "base_price": 1500,
                "pricing_type": "per_day"
            },
            "price": 1500,
            "discount": 10,
            "final_price": 1350,
            "average_rating": 2.5,
            "total_bookings": 0,
            "status": "active",
            "addons": [],
            "notes": ""
        }
    ]
}
