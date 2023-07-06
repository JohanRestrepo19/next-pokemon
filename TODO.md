1.  **Pages**:
    - [x] Sign in. -> /sign-in
        - [x] Implement sign in form logic 
    - [ ] Sign up -> /sign-up
        - [ ] Implement sign up form logic 
    - [x] Pokemon list -> /pokemon
      - [x] Show pokemon list
      - [x] Include animations in pokemon cards
    - [x] Pokemon details -> /pokemon/name

## Possible optimizations.

The biggest performance issue with this project is **firebase and next-firebase-auth** dependencies which
means that any page which has a dependency on those packages will have a slow first load js on the 
client

- [ ] Lazy load dependencies on pokemon, pokemon/[name], sign-in pages.
    - [ ] Analyze problems related to sign-in page. 
    - [ ] Analyze problems related to pokemon/[name]. 
        - [ ] Improve images loading on pokemon/[name] page.
    - [ ] Analyze problems related to pokemon. 
