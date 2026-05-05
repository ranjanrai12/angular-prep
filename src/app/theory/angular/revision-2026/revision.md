# 🔥 ROUND 1: Application Architecture

### ❓ Q1: How do you structure a large-scale Angular application?
- 🧠 1. Domain-Driven Structure (Most Important)
- 🧩 2. Feature Isolation with Lazy Loading
- 🏗️ 3. Core vs Shared vs Feature (Clear Separation)
- ⚙️ 4. State Management Strategy
- 🔁 5. Data Flow & API Layer
- 🧱 6. Reusability via Libraries (Not Shared Dump)
    Instead of dumping everything into SharedModule:

    - Use internal libraries (especially with Nx):
    - UI library
    - Utility library
    - Data-access layer

  💡 This avoids:

    - Tight coupling
    - Merge conflicts
- 🚀 7. Performance Strategy
- 🔐 8. Security & Config
- 🧪 9. Testing Strategy
- 🧑‍🤝‍🧑 10. Scaling for Multiple Teams
### ❓ Q2: How do you handle state management in Angular at scale?

### ❓ Q3: How do you design reusable components?
