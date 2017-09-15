# General
This lightweight app provides an easy inteface for querying a database of industry codes. You can query the database either by using the search widget on the home page or by making GET requests to the api endpoints. The api endpoints for making queries are documented below.

Please consult the following document for a reference to the Industry Codes: http://www.fastcomp.com/downloads/fastcompclasscodecrossreferenceguide.pdf

#API Endpoints

1. /api/industryCodes/all  
  --> returns a list of all industries with their respective codes  
  
2. /api/industryCode/description/:descriptionText  
  --> Where [:descriptionText] is a valid substring of an industry description  
  --> returns all industries with a description containing the :descriptionText  

3. /api/industryCodes/naics/:code  
  --> Where [:code] is a valid NCAIS code  
  --> returns all industries with a matching NCAIS code  
  
4. /api/industryCodes/ncci/:ncciCode  
  --> Where [:ncciCode] is a valid NCCI code  
  --> returns all industries with a matching NCCI code  

5. /api/industryCodes/ca_wc/:ca_wcCode  
  --> Where [:ca_wcCode] is a valid CA_WC code  
  --> returns all industries with a matching CA_WC code  
