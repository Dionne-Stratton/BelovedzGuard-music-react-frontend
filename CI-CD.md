# CI/CD Pipeline

This project includes a comprehensive GitHub Actions CI/CD pipeline that runs on every push and pull request.

## 🚀 **Pipeline Features**

### **Automated Testing**

- Runs tests on Node.js 18.x and 20.x
- Generates code coverage reports
- Uploads coverage to Codecov
- Fails build if tests don't pass

### **Code Quality**

- ESLint code quality checks
- Automated linting on every commit
- Zero tolerance for warnings

### **Build Verification**

- Production build verification
- Ensures code compiles successfully
- Catches build errors early

### **Automated Deployment**

- Deploys to GitHub Pages on main branch
- Automatic deployment after successful tests
- Zero-downtime deployments

## 📊 **Coverage Reports**

Code coverage is automatically generated and uploaded to Codecov. You can view detailed coverage reports at:

- [Codecov Dashboard](https://codecov.io/gh/your-username/belovedzguard-music-react-frontend)

## 🔧 **Local Development**

### **Run Tests**

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests for CI (no watch mode)
npm run test:ci
```

### **Linting**

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### **Build**

```bash
# Build for production
npm run build
```

## 🎯 **Pipeline Status**

[![CI/CD Pipeline](https://github.com/your-username/belovedzguard-music-react-frontend/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/your-username/belovedzguard-music-react-frontend/actions)

## 📈 **Benefits**

- **Quality Assurance**: Every commit is automatically tested
- **Early Detection**: Catches bugs before they reach production
- **Consistent Deployments**: Automated, reliable deployment process
- **Code Coverage**: Track test coverage over time
- **Professional Standards**: Industry-standard CI/CD practices
