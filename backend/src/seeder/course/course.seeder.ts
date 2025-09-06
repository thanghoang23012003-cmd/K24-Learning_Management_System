export const fakeCourses = async (count: number) => {
    const { faker } = await import('@faker-js/faker');
    
    const topics = [
        'Web Development',
        'Data Science',
        'Machine Learning',
        'Digital Marketing',
        'Graphic Design',
        'Cybersecurity',
        'Mobile Apps',
        'Business Management',
    ];

    const prefixes = [
        'Introduction to',
        'Advanced',
        'Mastering',
        'Complete Guide to',
        'Practical',
        'Fundamentals of',
    ];

    const courses = [];

    for (let i = 0; i < count; i++) {
        const totalRating = faker.datatype.number({ min: 50, max: 100 }); // số lượt rating
        const avgRating = parseFloat(
            faker.datatype.float({ min: 3, max: 5, precision: 0.1 }).toFixed(1) // điểm trung bình 3-5
        );
        const totalChapter = faker.datatype.number({ min: 5, max: 20 });
        const totalCertificate = faker.datatype.number({ min: 50, max: 500 });
        const totalFavorite = faker.datatype.number({ min: 100, max: 1000 });
        const totalOrder = faker.datatype.number({ min: 100, max: 1000 });
        const totalHour = faker.datatype.number({ min: 10, max: 100 });
        const price = faker.datatype.number({ min: 20, max: 200, precision: 0.01 });

        courses.push({
            title: `${faker.helpers.arrayElement(prefixes)} ${faker.helpers.arrayElement(topics)}`,                  // trả về string có 3 từ
            description: faker.lorem.sentences(3),        // trả về string có 3 câu
            avgRating,
            totalRating,
            totalChapter,
            totalCertificate,
            totalFavorite,
            totalOrder,
            totalHour,
            price,
        });
    }


    return courses;
};
