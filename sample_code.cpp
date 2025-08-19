#include <iostream>
#include <string>

int main() {
    // Variable declarations
    std::string name;
    int age;
    
    // Taking input from user
    std::cout << "Enter your name: ";
    std::getline(std::cin, name);
    
    std::cout << "Enter your age: ";
    std::cin >> age;
    
    // Processing and displaying output
    std::cout << "\nHello, " << name << "!" << std::endl;
    std::cout << "You are " << age << " years old." << std::endl;
    
    if (age < 18) {
        std::cout << "You are a minor." << std::endl;
    } else if (age >= 18 && age < 65) {
        std::cout << "You are an adult." << std::endl;
    } else {
        std::cout << "You are a senior citizen." << std::endl;
    }
    
    return 0;
}