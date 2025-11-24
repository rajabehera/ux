import { Link } from 'react-router-dom';
import { caseStudiesData } from '../data/CaseStudies';

const PortfolioList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold mb-12 text-center">Portfolio</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map(study => (
            <Link 
              key={study.slug}
              to={`/case-study/${study.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div 
                  className="h-48 p-8 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${study.colors.primary}, ${study.colors.secondary})`
                  }}
                >
                  {/* <img 
                    src={study.overview.challenge.image} 
                    alt={study.title}
                    className="h-full object-contain"
                  /> */}
                </div>
                
                <div className="p-6">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {study.badge}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {study.subtitle}
                  </p>
                  
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    View Case Study 
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;