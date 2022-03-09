from bs4 import BeautifulSoup
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import re
import time
from bcolors import bcolors




def render_page(url):
    """
    This function returns the page source after scrolling the length of the page
    The purpose of this function is to render the javscript on the page so that the entire page source can be
    scraped. This works for any page that requires a
    :param url:
    :return:
    """

    # Establish driver
    driver = webdriver.Chrome()

    # Get the url (open the page in chrome)
    driver.get(url)
    driver.minimize_window();

    # Press the escape to exit any modal that may be present
    webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()

    # Scroll the length of the page to allow all javascript to render
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Give it a sec to get its bearings, if you don't do this sometimes it will quit early and
    # not render the javscript
    time.sleep(1)

    # Get the page source with rendered javascript
    r = driver.page_source

    # Quit chrome and return the page source
    driver.quit()
    return r



def main():
    """
    This main function will loop over the data on any carvana.com/cars webpage and scrape all info from the cars
    as well as visit each individual link for the cars and collect further data such as the features the car comes with.
    This can be things like bluetooth, hands free calling, heated seats, backup camera etc.

    The function collects the data for all basic info first, as well as the links, and then in sequence will visit
    those links to request the remaining data.

    By the end of the loops, each column will have an even number of data points with the appropriate information
    corresponding to each car. You can verify this by selecting a number of pages and following a few links
    at the very bottom of your output CSV and verifying that the information included matches the appropriate car,
    and that the collected link actually links to the correct vehicle.
    :return:
    """


    # Set up dictionary to store collected data
    data = {
        'year_make': [],
        'model': [],
        'details': [],
        'mileage': [],
        'Bluetooth': [],
        'Backup Camera': [],
        'Infotainment': [],
        'Screen': [],
        'Navigation': [],
        'Hands Free Calling': [],
        'Heated Seats': [],
        'Power Seat Controls': [],
        'Rear Air Vents': [],
        'Bed Liner': [],
        'Tow Hitch': [],
        '4-Cyl': [],
        '3-Cyl': [],
        'V6': [],
        'V8': [],
        '6-Cyl': [],
        'city_mpg': [],
        'highway_mpg': [],
        'No Reported Accidents': [],
        'price': [],
        'url': []
    }


    # These are the terms that will be searched later when the appropriate text is retrieved for each car
    # These correspond with the dictionary keys above
    search_terms = ['Bluetooth',
                    'Backup Camera',
                    'Infotainment',
                    'Screen',
                    'Navigation',
                    'Hands Free Calling',
                    'Heated Seats',
                    'Power Seat Controls',
                    'Rear Air Vents',
                    'Bed Liner',
                    'Tow Hitch',
                    '4-Cyl',
                    '3-Cyl',
                    'V6',
                    'V8',
                    '6-Cyl',
                    'No Reported Accidents']

    # Get number of pages to scrape
    num_pages = int(input("Enter number of pages to scrape: "))

    # Set up a global index to keep track of which car we are on, and how many we've collected
    general_index = 0

    # Each page has 22 car panels, so we expect the count to increment by 22 for each new page
    # This will be used to verify that we received data from the webpage
    expected_car_count = 22


    for n in range(1, num_pages+1):

        # Get page at n
        url = f"https://www.carvana.com/cars/2009-2013?page={n}"

        # Check for 200 response, keep trying until successful
        response = 0
        while response != 200:
            res = requests.get(url)
            if(res.status_code == 200):
                response = 200

        # General information about the car count, and response code so far using yellow color to print to console
        print(f"{bcolors.WARNING}-------------------{bcolors.ENDC}")
        print(f"{bcolors.BOLD}{bcolors.WARNING}Scraping Page {n}{bcolors.ENDC}")
        print(f"{bcolors.WARNING}Page URL: {url}{bcolors.ENDC}")
        print(f"{bcolors.WARNING}Page Response: {res.status_code}{bcolors.ENDC}")
        print(f"{bcolors.WARNING}Expected Car count: {expected_car_count}{bcolors.ENDC}")
        print(f"{bcolors.WARNING}-------------------{bcolors.ENDC}")



        # Instatiate beautifulsoup with the text from the response
        soup = BeautifulSoup(res.text, 'html.parser')


        # Attempt to collect ALL base information about the car including:
        # Year, make, model, price, mileage, and details
        for div in soup.find_all("div", class_=['year-make']):
            data['year_make'].append(div.get_text())

        for div in soup.find_all('div', class_=['price']):
            data['price'].append(div.get_text())

        for div in soup.find_all('div', class_=['model']):
            data['model'].append(div.get_text())

        for div in soup.find_all('div', class_=['mileage']):
            data['mileage'].append(div.get_text())

        for div in soup.find_all('div', class_=['trim']):
            data['details'].append(div.get_text())


        # Instatiate empty list to keep track of NEW URL's scraped from the href of each car panel
        new_urls = []


        """
        PSA:
        If the length of 'year_make' has not incremented by 22, an unexpected web page loaded that won't
        allow us to collect the necessary information. I'm still not sure exactly what page it loads, but we know
        that if 'year_make' did not get 22 MORE points of data, then none of the other fields did either.
        
        In this case, we will request the page again and attempt to collect the same data as above.
        
        I have seen this fail up to 6 times. From another bot, I know that carvana has two different version
        of it's /cars page that has different classnames under the naming convention of "year-make-experiment", so this
        is very likely the page that has loaded when the bot fails to collect the data.
        
        This bot was set up to use the regular class names Eg. "year-make"
        
        """
        while(len(data['year_make']) != expected_car_count):

            # Print error messages
            print(f"{bcolors.FAIL}--------------------------------------------------------{bcolors.ENDC}")
            print(f"{bcolors.FAIL}Expected Car count not met, trying to request page again{bcolors.ENDC}")
            print(f"{bcolors.FAIL}The expected length was {expected_car_count}{bcolors.ENDC}")
            print(f"{bcolors.FAIL}--------------------------------------------------------{bcolors.ENDC}")

            res = requests.get(url)

            soup = BeautifulSoup(res.text, 'html.parser')


            for div in soup.find_all("div", class_=['year-make']):
                data['year_make'].append(div.get_text())

            for div in soup.find_all('div', class_=['price']):
                data['price'].append(div.get_text())

            for div in soup.find_all('div', class_=['model']):
                data['model'].append(div.get_text())

            for div in soup.find_all('div', class_=['mileage']):
                data['mileage'].append(div.get_text())

            for div in soup.find_all('div', class_=['trim']):
                data['details'].append(div.get_text())


        # Search for all HREF that match the pattern /vehicle/1234567
        # These will be the corresponding links for each car scraped in the appropriate order

        car_links = soup.find_all('a', href=True)
        for car in car_links:
            match = re.search(r'\/vehicle\/[0-9]+', car['href'])
            if match is not None:
                # Save the urls for the CSV writeout
                data['url'].append(f'https://www.carvana.com{match.group()}')
                # These are the only URLS we want to iterate over for this page since we did all previous
                new_urls.append(f'https://www.carvana.com{match.group()}')

        # Print the number of URL's that we will be opening as a sanity check to ensure there are 22
        # and to check that our vehicle count has in fact incremented by 22
        print(f"{bcolors.WARNING}Urls to search: {len(new_urls)}{bcolors.ENDC}")
        print(f"{bcolors.WARNING}Total Number of Vehicles: {len(data['year_make'])}{bcolors.ENDC}")

        for url in new_urls:
            # Print the the car count using general_index
            # Print the current url so you can check that the car you're seeing is in fact that corresponding link
            print("----------------------------------")
            print("Car Number:", general_index+1)
            print("Current url:", url)
            print("Current vehicle", data['year_make'][general_index])
            print("----------------------------------")

            # Using render_page(url) to open the page, scroll it, and retrieve the page source w/Javascript Rendered
            # Without it, we won't be able to see the contents of the div with id: 'vehicle-details'
            attempts = 0
            while attempts < 20:
                try:
                    r = render_page(url)
                    temp = BeautifulSoup(r, 'html.parser')
                    first = temp.find('div', {'id': 'vehicle-details'}).descendants
                    attempts = 0
                    break
                except:
                    print(f"{bcolors.FAIL}FAILED: Attempting to re-fetch {url}...{bcolors.ENDC}")
                    print(f"{bcolors.FAIL}Attempt {attempts}/20{bcolors.ENDC}")
                    if attempts == 19:
                        print(f"{bcolors.FAIL}{bcolors.BOLD}Max retries reached, failed at page {n}{bcolors.ENDC}")
                        sys.exit(0)

            text = []

            # Get all text from the descendants of the vehicle-details div
            for child in first:
                text.append(child.get_text())

            # Join the text from the array to make searching it for substrings simpler
            all_text = "\n".join(text)


            # If the term from the search_terms list is in the text retrieved, append a 1 to represent it's presence
            # Otherwise, append a 0 because it was not found
            # Eg. if Bluetooth in all_text, data['bluetooth'].append(1)
            for term in search_terms:
                if term in all_text:
                    data[term].append(1)
                else:
                    data[term].append(0)



            # Search all text for mention of the city vs. highway mileage
            # It will be in the form of '25 City / 29 Hwy'
            # If you don't find it, append 0's to keep the data length even across all columns
            # It will simply represent later that we didn't find the mpg differences
            city_highway = re.search(r"\d+ City \/ \d+ Hwy", all_text)
            if city_highway is not None:
                split_mpg = city_highway.group().split(' / ')
                data['city_mpg'].append(split_mpg[0])
                data['highway_mpg'].append(split_mpg[1])
            else:
                data['city_mpg'].append(0)
                data['highway_mpg'].append(0)

            # Increment general_index to keep track of what car we're on
            general_index += 1

        # Increment expected_car_count to ensure we're retrieving 22 points of data for ALL columns
        # on each iteration of this main loop
        expected_car_count += 22


        # Write out data at the end of every page in case of failure
        try:
            file_name = 'Carvana20092014.csv'
            df = pd.DataFrame(data)
            df.to_csv(file_name)
            print("Wrote data to CSV:", file_name)
        except:
            print(f"{bcolors.WARNING}{bcolors.BOLD}CLOSE THE CSV FILE{bcolors.ENDC}")
            wait_for_close = input("Press any key and hit enter to continue: ")


# Entry point

if __name__ == '__main__':
    main()
