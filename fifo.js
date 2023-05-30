 // JavaScript code for the above approach
 
    // Method to find page faults using FIFO
    function pageFaults(pages, n, capacity)
    {
        // To represent set of current pages. We use
        // an unordered_set so that we quickly check
        // if a page is present in set or not
        let s = new Set();
      
        // To store the pages in FIFO manner
         var indexes = [];
      
        // Start from initial page
        let page_faults = 0;
        for (let i=0; i<n; i++)
        {
            // Check if the set can hold more pages
            if (s.size < capacity)
            {
                // Insert it into set if not present
                // already which represents page fault
                if (!s.has(pages[i]))
                {
                    s.add(pages[i]);
      
                    // increment page fault
                    page_faults++;
      
                    // Push the current page into the queue
                    indexes.push(pages[i]);
                }
            }
      
            // If the set is full then need to perform FIFO
            // i.e. remove the first page of the queue from
            // set and queue both and insert the current page
            else
            {
                // Check if current page is not already
                // present in the set
                if (!s.has(pages[i]))
                {
                    //Pop the first page from the queue
                    let val = indexes[0];
      
                    indexes.shift();
      
                    // Remove the indexes page
                    s.delete(val);
      
                    // insert the current page
                    s.add(pages[i]);
      
                    // push the current page into
                    // the queue
                    indexes.push(pages[i]);
      
                    // Increment page faults
                    page_faults++;
                }
            }
        }
      
        return page_faults;
    }
 
// Driver Code
     
        let pages = [7,0,1,2,0,3,0,4,2,3,0,0,2,1,2,0,1,7];
  
        let capacity = 3;
        console.log(pageFaults(pages, pages.length, capacity));
     
    // This code is contributed by sanjoy_62.
